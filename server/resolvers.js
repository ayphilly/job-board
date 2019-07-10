const db = require('./db')

const Query = {
    job : (root, {id}) => {
        return db.jobs.get(id)
    },
   jobs : () => {
        return db.jobs.list();
    },
    company : (root, {id}) => {
        return db.companies.get(id)
    }
}

const Job = {
    company : (job ) => {
       return db.companies.get(job.companyId)

       //return comp.filter(e => e.id === job.companyId);
    }
}
const Company = {
    jobs : (company) => {
        return db.jobs.list().filter((job) => job.companyId === company.id)
    } 
}

module.exports = {
    Query,
    Job,
    Company
}