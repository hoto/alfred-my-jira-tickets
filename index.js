import alfy from 'alfy'
import fetch from 'node-fetch'
import btoa from 'btoa-lite'
import toAlfyOutputItem from './mapper.js'

const jiraUrl = alfy.userConfig.get('jiraUrl')
const jiraUser = alfy.userConfig.get('jiraEmail')
const jiraApiToken = alfy.userConfig.get('jiraApiKey')
const credentials = btoa(`${jiraUser}:${jiraApiToken}`)
const auth = { Authorization: `Basic ${credentials}` }
const currentUserOpenTickets = `rest/api/3/search?jql=assignee=currentuser() AND status not in (Done,Closed)`

fetch(`${jiraUrl}/${currentUserOpenTickets}`, { headers: auth })
  .then((response) => response.json())
  .then((data) =>
    alfy.output(
      data.issues
        .map((issue) => toAlfyOutputItem(issue))
        .reduce((prev, curr) => [...prev, curr], [])
    )
  )
  .catch((err) => alfy.error(err))
