/* eslint-disable camelcase */
const api = require('./services/api');

async function getRepoFromGit(fr) {
  const frame = String(fr);
  if (frame.toString().toLowerCase() === 'java') {
    const response = await api.get('/users/Snailclimb/repos');
    const [, awesome] = response.data;

    const {
      name,
      html_url,
      description,
      stargazers_count,
    } = awesome;

    return `
    _ _
    *Nome:* _${name}_
    _ _
    *Descrição:* _${description}_
    _ _
    *Strelas:* _${stargazers_count}_
    _ _
    [GITHUB](${html_url})
    `;
  }

  if (frame.toString().toLowerCase() === 'python') {
    const response = await api.get('/users/geekcomputers/repos');
    const [, , , , , , , , awesome] = response.data;

    const {
      name,
      html_url,
      description,
      stargazers_count,
    } = awesome;

    return `
    _ _
    *Nome:* _${name}_
    _ _
    *Descrição:* _${description}_
    _ _
    *Strelas:* _${stargazers_count}_
    _ _
    [GITHUB](${html_url})
    `;
  }

  if (frame.toString().toLowerCase() === 'js') {
    const response = await api.get('/orgs/Rocketseat/repos');
    const [, awesome] = response.data;

    const {
      name,
      html_url,
      description,
      stargazers_count,
    } = awesome;

    return `
    _ _
    *Nome:* _${name}_
    _ _
    *Descrição:* _${description}_
    _ _
    *Strelas:* _${stargazers_count}_
    _ _
    [GITHUB](${html_url})
    `;
  }

  return {};
}

module.exports = getRepoFromGit;
