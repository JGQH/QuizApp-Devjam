export default async function fetcher<T>(url:string, params: { [key:string] : string|number }) {
  try {
    const query = Object.keys(params).map(key => `${key}=${params[key]}`)
    const destination = `${url}?${query.join('&')}`

    const request = await fetch(destination, { method: 'GET' })

    if(!request.ok) return undefined

    const data:T = await request.json()

    return data
  } catch (e) {
    return undefined
  }
  
}