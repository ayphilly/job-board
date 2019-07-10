
const endPointUrl= 'http://localhost:9000/graphql';

 const graphqlRequest = async (query, variables = {}) => {

    const response =  await fetch(endPointUrl, {
        method : 'POST',
        headers : {'content-type' : 'application/json'},
        body : JSON.stringify({query, variables})
        
    });
    const responseBody = await response.json();

    if (responseBody.errors) {
        const message = responseBody.errors.map((error) => error.message).join('\n');
        throw new Error('GraphQl Error'+ message);
    }

    return responseBody.data;
 
 }

export const loadJobs = async () => {
    
   const response =  await fetch(endPointUrl, {
       method : 'POST',
       headers : {'content-type' : 'application/json'},
       body : JSON.stringify( {
           query : `
            {
                jobs {
                    id
                    title
                    company {
                        id
                        name      
                    }       
                }
            }
           
           `
       })
   });
   const responseBody = await response.json();
   return responseBody.data.jobs;

}

export const loadJob = async (id) => {
    
    const query = `query JobQuery ( $id :ID! ) {
  
        job(id : $id) {
          id
          title
          company{
            id
            name
          }
          description
        }
    }            
    `;
    
    const response = await graphqlRequest(query, {id})
   
    return response.job;
 
}

export const loadCompany = async (id) => {

    const query =   
        `
            query myCompany ($id : ID!) {
                company (id : $id) {
                id
                name
                description
                jobs {
                    id
                    title     
                }
                }
            }
        `;

    const data = await  graphqlRequest(query, {id})  
    
    return data.company;

}