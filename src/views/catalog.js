import { getAllJobs } from "../api/career.js";
import { html } from "../lib.js";

const catalogTemplate = (jobs) => html `
 <section id="dashboard">
          <h2>Job Offers</h2>
          <!-- Display a div with information about every post (if any)-->
            ${jobs.length == 0 ? html `<h2>No offers yet.</h2>` : jobs.map(jobsCard)}
        </section>
`
 const jobsCard = (job) => html `
  <div class="offer">
            <img src= "${job.imageUrl}" alt="example2" />
            <p>
              <strong>Title: </strong
              ><span class="title">${job.title}</span>
            </p>
            <p><strong>Salary:</strong><span class="salary">${job.salary}</span></p>
            <a class="details-btn" href="">Details</a>
          </div>
 `


export async function catalogView(ctx){
    const jobs = await getAllJobs()
    ctx.render(catalogTemplate(jobs))
}