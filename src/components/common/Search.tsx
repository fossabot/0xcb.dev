import React, { FunctionComponent, useEffect, useRef, useState } from "react"
import { FaSearch } from "react-icons/fa"
import GhostPost from "../../models/GhostPost"
import { Link, navigate } from "gatsby"

// TODO: Close icon

const Search: FunctionComponent = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const resultListRef = useRef<HTMLUListElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const resultRefs: HTMLElement[] = []
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<GhostPost[]>([])
  const [query, setQuery] = useState<string>("")
  const [selected, setSelected] = useState<number>(0)

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true)
  })

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  const search = (event) => {
    const input = event.target.value
    if (!input || !(window as any).__LUNR__ || input === "") {
      setQuery(input)
      return setResults([])
    }
    const lunrIndex = (window as any).__LUNR__["en"] // tslint:disable-line
    setResults(
      lunrIndex.index.search(input + "*").map(({ ref }) => {
        return lunrIndex.store[ref] // tslint:disable-line
      })
    )
    if (results.length > 0) {
      setSelected(0)
    }
    setQuery(input)
  }

  const toggleSearch = () => {
    setIsOpen(true)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const scrollToResult = (selectIndex) => {
    if (resultListRef.current && resultRefs[selectIndex]) {
      const current = resultRefs[selectIndex]
      resultListRef.current.scrollTop =
        current.offsetTop - resultListRef.current.offsetTop
    }
  }

  const handleKey = (event) => {
    const currentSelection = results[selected]

    switch (event.key) {
      case "Escape":
        if (query === "") {
          return setIsOpen(false)
        }
        setSelected(0)
        setResults([])
        return setQuery("")
      case "ArrowDown":
        event.preventDefault()
        scrollToResult(selected + 1)
        return setSelected(
          selected + 1 >= results.length ? selected : selected + 1
        )
      case "ArrowUp":
        event.preventDefault()
        scrollToResult(selected - 1)
        return setSelected(selected - 1 >= 0 ? selected - 1 : 0)
      case "PageDown":
        event.preventDefault()
        scrollToResult(selected + 5 <= results.length ? selected + 5 : selected)
        return setSelected(
          selected + 5 <= results.length ? selected + 5 : results.length - 1
        )
      case "PageUp":
        event.preventDefault()
        scrollToResult(selected - 5 > 0 ? selected - 5 : 0)
        return setSelected(selected - 5 > 0 ? selected - 5 : 0)
      case "Home":
        event.preventDefault()
        scrollToResult(0)
        return setSelected(0)
      case "End":
        event.preventDefault()
        scrollToResult(results.length - 1)
        return setSelected(results.length - 1)
      case "Enter":
        event.preventDefault()
        setIsOpen(false)
        navigate(`/${currentSelection.slug}`)
        return
    }
  }

  return (
    <>
      <button
        className={`navigation__item-link toggle-search`}
        onClick={() => toggleSearch()}
        role={`button`}
        aria-label={`Search`}
      >
        <FaSearch />
      </button>
      {isOpen && (
        <div
          className={`search ${isOpen ? "search--open" : ""}`}
          ref={searchRef}
        >
          <input
            type={`text`}
            className={`search__input`}
            onChange={search}
            onKeyDown={handleKey}
            value={query}
            autoFocus={true}
            ref={inputRef}
            placeholder={`What are you looking for?`}
          />

          <h5 className={`search__results-title`}>
            Results ({results.length})
          </h5>

          <ul className={`search__result-list`} ref={resultListRef}>
            {results.map((item, index) => (
              <li
                className={`search__result ${
                  selected === index ? "search__result--selected" : ""
                }`}
                onMouseOver={() => setSelected(index)}
                key={index}
                ref={(ref) => {
                  if (ref) {
                    resultRefs[index] = ref
                  }
                }}
              >
                <Link to={item.slug} className={`search__result-link`}>
                  <small>{item.tags.map((tag) => tag.name).join(", ")}</small>
                  <h4 className={`search__result-title`}>{item.title}</h4>
                  {item.excerpt}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default Search
