/**
 * Passing jiraUrl is a hack to pass the url when opening issue in the browser.
 * It's impossible to expose the variable from the "userConfig" to the workflow ATM (or I'm too stupid to figure it out).
 */
const toAlfyOutputItem = (issue, jiraUrl) => {
  const {
    key, // e.g. 'GJ-1234'
    fields: {
      summary, // e.g. 'Fix some bug blah blah'
      status: { name: status }, // e.g. 'In Progress'
      updated, // e.g. '2022-08-12T12:28:24.346+0100'
    },
  } = issue
  return {
    title: `${key}`,
    subtitle: `${summary}`,
    arg: [key, jiraUrl],
    text: {
      copy: key,
      largetype: key,
    },
    variables: {
      action: 'copy',
    },
  }
}

export default toAlfyOutputItem
