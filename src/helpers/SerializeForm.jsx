export const SerializeForm = (form) => {
    const formData = new FormData(form)

    const completeObject = {};

    // console.log(formData)

    for (let [name, value] of formData) {
        completeObject[name] = value;
    }

    return completeObject;
}