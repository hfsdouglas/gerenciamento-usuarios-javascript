class UserController {
  constructor(formId, tableId) {
    this.formEl = document.getElementById(formId)
    this.tableEl = document.getElementById(tableId)
    this.onSubmit()
  }
  onSubmit() {
    this.formEl.addEventListener('submit', event => {
      event.preventDefault()
      let values = this.getValues()
      this.getPhoto(content => {
        values.photo = content
        this.addLine(values)
      })
    })
  }
  getPhoto(callback) {
    let fileReader = new FileReader()
    let elements = [...this.formEl.elements].filter(item => {
      if (item.name === 'photo') {
        return item
      }
    })
    let file = elements[0].files[0]
    fileReader.onload = () => {
      callback(fileReader.result)
    }
    fileReader.readAsDataURL(file)
  }
  getValues() {
    let user = {}
    ;[...this.formEl.elements].forEach((field, index) => {
      if (field.name == 'gender') {
        if (field.checked) {
          user[field.name] = field.value
        }
      } else {
        user[field.name] = field.value
      }
    })
    return new User(
      user.name,
      user.gender,
      user.birth,
      user.country,
      user.email,
      user.password,
      user.photo,
      user.admin
    )
  }
  addLine(userData) {
    this.tableEl.innerHTML = `<tr>
      <td>
        <img src="${userData.photo}" alt="User Image" class="img-circle img-sm" />
      </td>
      <td>${userData.name}</td>
      <td>${userData.email}</td>
      <td>${userData.admin}</td>
      <td>${userData.birth}</td>
      <td>
        <button type="button" class="btn btn-primary btn-xs btn-flat"> Editar </button>
        <button type="button" class="btn btn-danger btn-xs btn-flat"> Excluir </button>
      </td>
    </tr>`
  }
}
