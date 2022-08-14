import alfy from 'alfy'

const jiraApiToken = process.env.jiraApiToken

alfy.output([
  {
    title: jiraApiToken,
    arg: jiraApiToken,
    text: {
      copy: jiraApiToken,
      largetype: jiraApiToken,
    },
    variables: {
      action: 'copy',
    },
  },
])
