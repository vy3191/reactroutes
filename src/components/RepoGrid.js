import React from 'react';

function RepoGrid (props) {
  return (
    <ul style={{display: 'flex', flexWrap: 'wrap'}}>
      {props.repos.map(({ name, owner, stargazers_count, html_url }) => (
        <li key={name} style={{margin: 30}}>
          <ul>
            <li><a href={html_url}>{name}</a></li>
            <li>@{owner.login}</li>
            <li>{stargazers_count} stars</li>
          </ul>
        </li>
      ))}
    </ul>
  )
}

export default RepoGrid;