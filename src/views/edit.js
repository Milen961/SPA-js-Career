import { getOfferById, updateOffer } from "../api/career.js";
import { html } from '../lib.js'

const editTemplate = (offer, onSubmit) => html `
  <section id="edit">
          <div class="form">
            <h2>Edit Offer</h2>
            <form @submit=${onSubmit} class="edit-form">
              <input
                type="text"
                name="title" .value=${offer.title}
                id="job-title"
                placeholder="Title"
              />
              <input
                type="text"
                name="imageUrl" .value=${offer.imageUrl}
                id="job-logo"
                placeholder="Company logo url"
              />
              <input
                type="text"
                name="category" .value=${offer.category}
                id="job-category"
                placeholder="Category"
              />
              <textarea
                id="job-description"
                name="description" .value=${offer.description}
                placeholder="Description"
                rows="4"
                cols="50"
              ></textarea>
              <textarea
                id="job-requirements"
                name="requirements" .value=${offer.requirements}
                placeholder="Requirements"
                rows="4"
                cols="50"
              ></textarea>
              <input
                type="text"
                name="salary" .value=${offer.salary}
                id="job-salary"
                placeholder="Salary"
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>
`
export async function eiditView(ctx){
  const offer = await getOfferById(ctx.params.id)

  ctx.render(editTemplate(offer, onSubmit))

  async function onSubmit(event){
      event.preventDefault()
      const formData = new FormData(event.target)

      const offer = {
          title: formData.get('title'),
          imageUrl: formData.get('imageUrl'),
          category: formData.get('category'),
          description: formData.get('description'),
          requirements: formData.get('requirements'),
          salary: formData.get('salary')

      };
      if(offer.title == ''|| offer.description == ''|| offer.imageUrl == '' || offer.category == '' 
      || offer.requirements == '' || offer.salary == ''){
          return alert('All fields are required!')
      }
      await updateOffer(ctx.params.id, offer);
      event.target.reset()
      ctx.page.redirect('/details/' + ctx.params.id)
  }
}