import alfy from 'alfy'
import fetch from 'node-fetch'
import btoa from 'btoa-lite'

const jiraUrl = process.env.JIRA_URL
const jiraUser = process.env.JIRA_USER
const jiraApiToken = process.env.JIRA_API_TOKEN
const credentials = btoa(`${jiraUser}:${jiraApiToken}`)
const auth = { Authorization: `Basic ${credentials}` }

fetch(`${jiraUrl}/rest/api/3/search?jql=assignee=currentuser() AND status not in (Done,Closed)`, { headers: auth })
  .then((response) => response.json())
  .then((data) => {
    const totalIssues = data.total
    const issue = data.issues[0]
    const id = issue.key // e.g. GJ-1234
    const description = issue.fields.summary // e.g. 'Fix a bug in blah blah'
    const status = issue.fields.status.name // e.g. 'In Progress'
    const updated = issue.fields.updated // e.g. '2022-08-12T12:28:24.346+0100'
    alfy.output([
      {
        title: `${id} ${description}`,
        subtitle: `${status}, Updated: ${updated}`,
        arg: id,
        text: {
          copy: id,
          largetype: id,
        },
        variables: {
          action: 'copy',
        },
      },
    ])
  })
  .catch((err) => alfy.error(err))
