<div class="container">
  <Lnb />
  <div class="contents">
    <Titlebar />
    <article>
      <div class="SearchBox">
        <div class="columns">
          <div class="column is-3">
            <Field label="City" required memo="Guide text">
              <Select>
                <option>Text</option>
              </Select>
            </Field>
          </div>
          <div class="column is-3">
            <Field label="Keyword">
              <Input placeholder="Placeholder" />
            </Field>
          </div>
          <div class="column is-3">
            <Field label="Reservation">
              <label>
                <input type="radio" checked />
                Available
              </label>
              <label>
                <input type="radio" />
                Unavailable
              </label>
            </Field>
          </div>
          <div class="column is-3" />
        </div>
        <div class="button">
          <Button />
          <Button class="is-primary">Search</Button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th> No </th>
            <th> Title </th>
            <th> Name </th>
            <th> Regist Date </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> 1 </td>
            <td> Text </td>
            <td> name </td>
            <td> 2023-01-01 </td>
          </tr>
          <tr>
            <td> 2 </td>
            <td> Text </td>
            <td> name </td>
            <td> 2023-01-01 </td>
          </tr>
          <tr>
            <td> 3 </td>
            <td> Text </td>
            <td> name </td>
            <td> 2023-01-01 </td>
          </tr>
          <tr>
            <td> 4 </td>
            <td> Text </td>
            <td> name </td>
            <td> 2023-01-01 </td>
          </tr>
          <tr>
            <td> 5 </td>
            <td> Text </td>
            <td> name </td>
            <td> 2023-01-01 </td>
          </tr>
        </tbody>
      </table>
      <Field>
        <Pagination />
      </Field>
    </article>
  </div>
</div>
Get Code
