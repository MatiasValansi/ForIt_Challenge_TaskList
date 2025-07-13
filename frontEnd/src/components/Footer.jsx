import React from 'react';
import '../App.css'; 

function Footer() {
  const githubRepoUrl = 'https://github.com/MatiasValansi/ForIt_Challenge_TaskList'
  const yourName = 'Matías Valansi'

  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} {yourName}</p>
      <a href={githubRepoUrl} target="_blank" rel="noopener noreferrer">
          Ver código del proyecto en GitHub
        </a>
    </footer>
  );
}

export default Footer;