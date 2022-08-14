const toAlfyOutputItem = (issue) => {
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
    arg: key,
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
