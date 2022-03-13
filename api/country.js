import MainApi from '@/api/endpoint'
export function getListCountry(country) {
  return MainApi.get(`country/${country}`)
}
