import alfy from 'alfy'
import btoa from 'btoa-lite'
import toAlfyOutputItem from './mapper.js'

const jiraUrl = alfy.userConfig.get('jiraUrl')
const jiraUser = alfy.userConfig.get('jiraEmail')
const jiraApiToken = alfy.userConfig.get('jiraApiKey')
const credentials = btoa(`${jiraUser}:${jiraApiToken}`)
const auth = { Authorization: `Basic ${credentials}` }
const currentUserOpenTickets = `rest/api/3/search?jql=assignee=currentuser() AND status not in (Done,Closed)`
const oneMinInMs = 60000

const issuesToAlfyOutput = (body) =>
  body.issues
    .map((issue) => toAlfyOutputItem(issue, jiraUrl))
    .reduce((prev, curr) => [...prev, curr], [])

alfy
  .fetch(`${jiraUrl}/${currentUserOpenTickets}`, {
    headers: auth,
    maxAge: oneMinInMs,
    transform: issuesToAlfyOutput,
  })
  .then(alfy.output)
  .catch(alfy.error)
