import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [countries, setCountries] = useState([])
  useEffect(() => {
    const fetchCountries = async () => {
      const res = await axios.get("https://restcountries.com/v3.1/all")
      setCountries(res.data)
    }
    fetchCountries()
  }, [countries])
  return (
    <div className="">
      {countries.length === 0 ? (
        <div class="bg-white rounded-lg border pt-10 border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 p-4 max-w-sm w-full mx-auto">
          <div class="animate-pulse flex space-x-4">
            <div class="rounded-full bg-slate-200 h-10 w-10"></div>
            <div class="flex-1 space-y-6 py-1">
              <div class="h-2 bg-slate-200 rounded"></div>
              <div class="space-y-3">
                <div class="grid grid-cols-3 gap-4">
                  <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                  <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                </div>
                <div class="h-2 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ):(
        <div>
          <Navbar countries={countries} setCountries={setCountries}/>
          <Countries countries={countries}/>
        </div>
      )}
    </div>
  );
}

const Countries = (props) => {
  const {countries} = props;
  return ( 
      <div className="container mx-auto">
          <div className="grid grid-cols-4 gap-4">
              {
                  countries.map((country) => (
                      <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700" key={country.name}>
                          <div className="w-full p-5">
                              <img className="rounded-t-lg object-fill h-50 w-96" src={country.flags.png} alt="" />
                          </div>
                          <div className="p-5">
                              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{country.name.official}</h5>
                              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Population: </b>{country.population}</p>
                              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Region: </b>{country.region}</p>
                              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Capital: </b>{country.capital}</p>
                          </div>
                      </div>
                  ))
              }
          </div>
      </div>
  );
}

const Navbar = (props) => {
  const {countries, setCountries} = props

  const handleSearch = (e) => {
      e.preventDefault();
      const searchTerm = e.target.elements.searchInput.value
      const found = countries.filter((country) => {
          const condition = country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
          return condition 
      })
      setCountries(found);
  }
  return ( 
      <nav className="relative container mx-auto py-6 fle">
          <div className="flex items-center justify-between">
              <div className="flex justify-center pt-3">
                  <div className="mb-3 xl:w-96">
                      <div className="input-group relative flex mb-4">
                          <form className="flex" onSubmit={handleSearch} action="POST">
                              <input name="searchInput" type="search" className="form-control 
                              relative 
                              flex-auto 
                              min-w-0 
                              rounded-full 
                              block w-full 
                              px-3 py-1.5 text-base 
                              font-normal 
                              text-gray-700 
                              bg-white 
                              bg-clip-padding 
                              border 
                              border-solid 
                              border-brightRedLight 
                              transition ease-in-out m-0 
                              focus:text-darkGrayishBlue 
                              focus:bg-white 
                              focus:border-text-darkGrayishBlue 
                              focus:outline-none" 
                              placeholder="Search" 
                              aria-label="Search" 
                              aria-describedby="button-addon2 " />
                              <button className="btn px-6 py-2.5 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight active:shadow-lg transition duration-150 ease-in-out flex items-center" type="submit" id="button-addon2">
                                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                  <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                                  </svg>
                              </button>
                          </form>
                      </div>
                  </div>
              </div>

              <div className="flex justify-center">
              <div className="mb-3 xl:w-96">
                  <select className="form-select
                  appearance-none
                  block
                  w-full
                  px-5
                  py-1.5
                  text-base
                  font-normal
                  text-darkGrayishBlue
                  bg-white bg-clip-padding bg-no-repeat
                  border border-solid border-brightRedLight
                  transition
                  ease-in-out
                  rounded-full
                  focus:text-gray-700 
                  focus:bg-white 
                  focus:border-text-darkGrayishBlue 
                  focus:outline-none" 
                  aria-label="Default select example">
                      <option selected>Filter by region</option>
                      <option value="Americas">Americas</option>
                      <option value="Africa">Africa</option>
                      <option value="Asia">Asia</option>
                      <option value="Europe">Europe</option>
                  </select>
              </div>
              </div>
          </div>
      </nav>
  );
}

export default App;
