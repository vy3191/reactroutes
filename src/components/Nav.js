import React from 'react';

function Nav(props) {
   const languages = ['all', 'Javascript', 'Ruby', 'Python']
   return(
     <ul>
       {languages.map( (language,index) =>(
          <li key={index}
              onClick={()=> props.changeLang(language)}>{language}</li>
       ))}
     </ul>
   );
}

export default Nav;