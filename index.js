/**
 * ga4-changelog
 */
import got from 'got'
import { NodeHtmlMarkdown } from 'node-html-markdown'

/* Google's GA4 `what's new` URL */
const googleUrl = 'https://support.google.com/analytics/answer/9164320'

/**
 * Fetch the latest `what's new` changes for Google Analytics 4 and return them in an object
 * @param {string} languageCode ISO two letter language code
 * @returns object
 */
const changelog = async (languageCode = 'en') => {
  /* Fetch the raw HTML */
  const response = await got(`${googleUrl}?hl=${languageCode}`)
  const html = response.body

  /* Extract the listed changes */
  const changes = [...html.matchAll(/(?=.*(<h2 id="[0-9][\s\S]*?)(<h2 id=|<\/div>))/gi)].map(change => change[1])

  /* Loop through our captured information */
  const results = changes.map((change) => [
    /* Capture the change specifics */
    ...change.matchAll(/<h2 id="(?<id>.*?)".*?h2>(?<html>[\s\S]*)/g)]
    /* Map it back to an object */
    .map((result) => { return { ...result.groups } })[0]
  )

  /* Create an instance of nhm */
  const nhm = new NodeHtmlMarkdown()

  /* Clean and prep data */
  const finalResults = []
  results.forEach(result => {
    result.html = result.html.trim()
    const updateSections = result.html.split(/(?=<h3>)/g) // Split HTML content based on <h3> tags

    updateSections.forEach(section => {
      const updates = [...section.matchAll(/<h3>(.*?)<\/h3>/g)].map(heading => heading[1])

      updates.forEach(update => {
        finalResults.push({
          date: new Date(Date.parse(`20${result.id.slice(-2)}-${result.id.slice(0, 2)}-${result.id.slice(2, 4)}`)),
          update: update,
          markdown: nhm.translate(section),
          html: section
        })
      })
    })
  })

  return finalResults
}

export default changelog
