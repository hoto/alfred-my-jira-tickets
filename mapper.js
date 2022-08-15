const toAlfyOutputItem = (issue, jiraUrl) => {
  const {
    key, // e.g. 'GJ-1234'
    fields: {
      summary, // e.g. 'Fix some bug blah blah'
      status: { name: status }, // e.g. 'In Progress'
      updated, // e.g. '2022-08-12T12:28:24.346+0100'
    },
  } = issue
  const kebabCaseSummary = summary.toLowerCase().trim().split(' ').join('-')
  return {
    title: `${key}`,
    subtitle: `${summary}`,
    arg: [jiraUrl, key, summary, kebabCaseSummary], // hack to pass variables to the workflow
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
