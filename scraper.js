// TODO give command line options for a file containing a starting pool
const fs = require('fs')
const fetch = require('node-fetch')
const Trie = require('./Trie.js')


const seed_pages = [
	"Wildlife",
	"History of science",
	"History of technology",
	"History of medicine",
	"History of film",
	"History of writing",
	"History of biology",
	"History of communication",
	"History of computing",
	"History of theatre",
	"History of art",
	"Literature",
	"Natural history",
	"Manufacturing",
	"Cooking",
	"Cuisine",
	"Fantasy",
	"Science fiction",
	"Horror fiction",
	"World Wide Web",
	"Folklore",
	"Internet meme",
	"Human behavior",
	"Mass media",
	"Ecosystem",
	"Economy",
	"Modern Era",
	"History of Earth",
	"Human history"
]

const poolFile = "accepted.txt"

const minViewsPer30Days = 5000
const goalNumTitles = 30000

let title_queue = []			// titles we haven't inspected yet
let backlog = []					// titles we've considered but haven't expanded yet
let accepted_titles = []	// titles that were deemed sufficient
let titlesAccepted = 0		// number of accepted titles found so far
let titlesSeen = 0				// number of total titles touched
let visitedTitles = new Trie() // Trie to ensure we don't look at any titles already pushed to the queue
seed_pages.forEach(s => visitedTitles.insert(s))


function checkpoint() {
 console.log("writing out", accepted_titles.length, "accepted titles")
 if (accepted_titles.length > 0)
   fs.appendFileSync(poolFile, accepted_titles.map(t => t + '\n').join(''), 'utf8')
 accepted_titles = []

 console.log("checkpoint")
}

function closeout() {
	checkpoint()
	process.exit(1)
}

process.on('exit', checkpoint)
process.on('SIGINT', closeout)

function encodeTitle(title) {
 return encodeURIComponent(title.replace(/\s+/g, "_"))
}

function interesting(title) {
	const leaveOut = [
		"history of ",
		"(disambiguation)",
		"list of ",
		" in ",
		"timeline of ",
		"men's",	// usually boring sports pages
		"women's",
		" election",
		"lists of ",
		"outline of ",
		" during ",
		" by ",
		" cuisine" // too many cuisine pages
	]
	return leaveOut.every(phrase => !title.toLowerCase().includes(phrase))
}

function collectLinksOn(title) {
	return fetch("https://en.wikipedia.org/w/api.php?action=parse&prop=links&redirects=true&format=json&page="+encodeTitle(title))
		.then(res => res.json())
		.then(json => {
			//console.log(json)
	 		return json.parse.links
				.filter(l => l.ns == 0 && l.exists != undefined)
				.map(l => l['*'])
		})
}

/**
 * 
 * @param {[string]} titles wikipedia article names 
 * @returns promise of the titles that meet the popularity threshold
 */
function filterPopular(titles, minimumPageviews=minViewsPer30Days) {
	const titlestr = titles.map(encodeTitle).join("|")
	return fetch("https://en.wikipedia.org/w/api.php?action=query&prop=pageviews&pvipdays=30&redirects=true&format=json&titles="+titlestr)
		.then(res => res.json())
		.then(json => {
			//console.log(json)
			return Object.values(json.query.pages)
				.filter(p => Object.values(p.pageviews).reduce((x,y)=>x+y, 0) >= minimumPageviews)
				.map(p => p.title)
		})
}

function sleep(sec) {
  return new Promise((resolve) => {
    setTimeout(resolve, sec*1000);
  });
}

let delay = 5 // seconds
const minDelay = 0.5
const maxDelay = 30
const increaseDelay = () => delay = Math.min(Math.max(delay,minDelay)*3,maxDelay)
const decreaseDelay = () => delay = Math.max(delay-1,minDelay)

// pop titles off the queue, check if they're popular
// send them to the backlog
async function chooseFromQueue() {
	if (titlesAccepted >= goalNumTitles) return

	if (title_queue.length == 0) {
		if (backlog.length > 0)
		// fetch more titles by requesting the links on pages we've seen
			await expand(backlog.splice(0,5))
		else return
	}

	const batch = title_queue.slice(0,5)
	console.log("testing popularity of", batch)
	try {
		const popularTitles = (await filterPopular(batch))
		const interestingTitles = popularTitles.filter(interesting)
		console.log("accepted titles", interestingTitles)
		interestingTitles.forEach(t => accepted_titles.push(t))
		titlesAccepted += interestingTitles.length

		batch.forEach(_ => title_queue.shift())		// remove the titles from the queue
		popularTitles.forEach(t => {
			backlog.push(t) // add popular titles to the backlog of titles we'll expand on (inspect its links)
			visitedTitles.insert(t)
		})

		decreaseDelay()
	} catch (err) {
		console.error(err)
		increaseDelay()
		checkpoint()
	} finally {
		console.log("sleeping", delay, "seconds")
		await sleep(delay)
		chooseFromQueue()
	}
}

// add the links found on the given titles to the queue
async function expand(titles, newLinks=[]) {
	if (titles.length == 0) {
		// shuffle the newly found links
		newLinks.sort(() => Math.random() - 0.5)
			.forEach(l => title_queue.push(l))
		return
	}

	try {
		const parent = titles[titles.length-1]
		console.log("collecting links on", parent)
		const children = await collectLinksOn(parent)
		console.log("found", children.length, "children on", parent)
		const newChildren = children.filter(c => !visitedTitles.contains(c))
		console.log("filtered to", newChildren.length, "new children")
		newChildren.forEach(c => {
			newLinks.push(c)
			visitedTitles.insert(c)
			titlesSeen++
		})
		console.log(titlesSeen, "titles seen")
		decreaseDelay()
		titles.pop()
	} catch (err) {
		console.error(err)
		increaseDelay()
	} finally {
		console.log("sleeping", delay, "seconds")
		await sleep(delay)
		await expand(titles, newLinks)
	}
}

expand(seed_pages).then(_ => chooseFromQueue())

//module.exports = {interesting, filterPopular, collectLinksOn}