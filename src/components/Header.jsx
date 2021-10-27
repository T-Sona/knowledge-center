import React from "react"
import { Link } from "gatsby"
import { RichTextElement } from "@kentico/gatsby-kontent-components"
import ThemeToggle from "./ThemeToggler"
import algoliasearch from "algoliasearch/lite"
import {
  InstantSearch,
  connectHits,
  connectStateResults,
  Index,
  SearchBox,
} from "react-instantsearch-dom"

let appId = process.env.GATSBY_ALGOLIA_APP_ID
let apiKey = process.env.GATSBY_ALGOLIA_APP_KEY
//console.log(appId, apiKey)
const searchClient = algoliasearch(appId, apiKey)

export default function Header() {
  const IndexResults = connectStateResults(
    ({ searchState, searchResults, children }) =>
      searchResults && searchResults.nbHits !== 0 && searchState.query
        ? children
        : null
  )
  return (
    <header className="navbar pb-2 shadow-lg z-50">
      <div className="px-2 mx-2 navbar-start sm:hidden">
        <Link to="/">
          {/* logo svg */}
          <svg
            width="276"
            height="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.472 6.154 2.577 4.49l1.986-1.951 1.693 1.86c.343-.26.703-.497 1.078-.71L6.232 1.442 8.826.384l.84 2.356c.418-.11.844-.193 1.274-.248L10.798 0h2.81l-.155 2.492c.43.055.856.138 1.275.248l.839-2.356 2.595 1.057-1.075 2.248c.374.212.734.45 1.078.71l1.692-1.861 1.987 1.951-1.896 1.665c.265.337.507.691.724 1.06l2.289-1.081 1.075 2.55-2.407.825c.111.41.195.828.251 1.25l2.537-.139v2.762l-2.537-.14c-.055.423-.14.84-.251 1.251l2.398.825-1.075 2.55-2.29-1.082c-.217.37-.458.724-.723 1.06l1.895 1.666-1.986 1.951-1.692-1.86a9.77 9.77 0 0 1-1.078.71l1.102 2.247-2.595 1.057-.839-2.356c-.419.11-.845.193-1.275.248L13.614 24h-2.81l.142-2.492a9.971 9.971 0 0 1-1.275-.248l-.838 2.356-2.595-1.057L7.34 20.31a9.761 9.761 0 0 1-1.078-.71l-1.693 1.861-1.986-1.951 1.895-1.665a9.568 9.568 0 0 1-.723-1.06l-2.29 1.081-1.074-2.55 2.398-.825a9.367 9.367 0 0 1-.252-1.25L0 13.38v-2.765l2.537.14c.056-.423.14-.84.252-1.251L.39 8.68l1.075-2.55 2.298 1.085c.212-.37.449-.723.708-1.06Zm1.817 5.843a5.893 5.893 0 0 0 .953 3.304 5.928 5.928 0 0 0 9.114.993A5.9 5.9 0 0 0 17.68 9.85a5.906 5.906 0 0 0-2.178-2.664 5.926 5.926 0 0 0-3.296-1.002A5.883 5.883 0 0 0 8.04 7.868a5.858 5.858 0 0 0-1.752 4.129Zm134.983-6.224 9.387 9.272V6.254H152v11.86l-9.387-9.256v8.746h-1.341V5.774Zm-16.39 6.152c0 2.558 2.201 4.694 4.932 4.694 2.731 0 4.93-2.136 4.93-4.694 0-2.56-2.171-4.698-4.93-4.698-2.758 0-4.932 2.126-4.932 4.697Zm11.203.015c0 3.265-2.84 5.855-6.271 5.855-3.43 0-6.271-2.59-6.271-5.855 0-3.266 2.841-5.886 6.271-5.886 3.431 0 6.271 2.638 6.271 5.889v-.003Zm-18.149-3.475c-.479-.782-1.054-1.235-2.075-1.235-1.068 0-1.995.722-1.995 1.76 0 .98 1.069 1.43 1.883 1.777l.8.333c1.565.646 2.888 1.383 2.888 3.19 0 1.988-1.692 3.508-3.781 3.508-1.932 0-3.368-1.176-3.749-2.937l1.308-.347a2.417 2.417 0 0 0 2.422 2.114c1.293 0 2.474-.933 2.474-2.211 0-1.278-1.102-1.777-2.219-2.257l-.733-.302c-1.405-.604-2.616-1.278-2.616-2.903 0-1.762 1.58-2.892 3.367-2.892a3.49 3.49 0 0 1 3.113 1.762l-1.087.64Zm-15.567 3.043h.409c1.514 0 3.046-.272 3.046-2.034 0-1.867-1.454-2.048-3.065-2.048h-.399l.009 4.082Zm0 6.096h-1.341V6.254h1.75c2.283 0 4.402.57 4.402 3.13 0 1.746-1.165 2.979-3.028 3.13l3.834 5.09h-1.644l-3.634-4.982h-.336l-.003 4.982ZM89.588 6.254h6.225v1.172h-4.887v3.375h4.754v1.175h-4.754v4.456h4.887v1.175h-6.225V6.254Zm-9.69 5.208h.909c1.484 0 2.743-.423 2.743-2.048 0-1.852-1.58-1.988-3.143-1.988h-.493l-.016 4.036Zm0 6.142h-1.344V6.254h1.98c1.036 0 2.12.03 2.983.604a3.075 3.075 0 0 1 1.356 2.59 3.106 3.106 0 0 1-1.147 2.437c-.815.632-1.85.752-2.855.752h-.975l.002 4.967ZM68.865 8.181v2.499h3.585v1.927h-3.585v3.073h3.724v1.927h-5.977V6.254h5.977V8.18h-3.724Zm-11.616 4.834 2.753-6.75h2.422l-5.13 11.97-5.083-11.981h2.422l2.616 6.761Zm-9.217 4.592H45.78V6.254h2.252v11.353Zm-9.75-1.927h3.189v1.927h-5.45V6.254h2.261v9.426Z"
              fill="#FF6900"
            />
            <path opacity=".2" stroke="var(--body-text)" d="M168.5 0v24" />
            <path
              d="m187.562 11.773-1.218 1.313v3.25H184V4.96h2.344v5.156l1.031-1.414 2.898-3.742h2.883l-4.039 5.055 4.156 6.32h-2.789l-2.922-4.563ZM197.686 7.883l.07.976c.604-.755 1.414-1.132 2.43-1.132.896 0 1.562.263 2 .789.437.526.661 1.312.672 2.359v5.46H200.6V10.93c0-.48-.104-.826-.312-1.04-.209-.218-.555-.328-1.04-.328-.635 0-1.112.271-1.429.813v5.96h-2.258V7.884h2.125ZM205.825 12.031c0-.838.161-1.586.484-2.242a3.556 3.556 0 0 1 1.391-1.523c.609-.36 1.315-.54 2.117-.54 1.141 0 2.071.35 2.789 1.047.724.698 1.128 1.646 1.211 2.844l.016.578c0 1.297-.362 2.339-1.086 3.125-.724.782-1.695 1.172-2.914 1.172s-2.193-.39-2.922-1.172c-.724-.78-1.086-1.843-1.086-3.187v-.102Zm2.258.164c0 .802.151 1.417.453 1.844.302.422.734.633 1.297.633.547 0 .974-.209 1.281-.625.307-.422.461-1.094.461-2.016 0-.786-.154-1.396-.461-1.828-.307-.432-.74-.648-1.297-.648-.552 0-.979.216-1.281.648-.302.427-.453 1.091-.453 1.992ZM224.175 13.266l1.109-5.383h2.18l-2.156 8.453h-1.891l-1.601-5.32-1.602 5.32h-1.883l-2.156-8.453h2.18l1.101 5.375 1.547-5.375h1.633l1.539 5.383ZM232.572 16.336h-2.266v-12h2.266v12ZM239.93 16.492c-1.24 0-2.25-.38-3.032-1.14-.776-.76-1.164-1.774-1.164-3.04v-.218c0-.85.164-1.607.493-2.274.328-.672.791-1.187 1.39-1.547.604-.364 1.292-.546 2.063-.546 1.156 0 2.065.364 2.726 1.093.667.73 1 1.763 1 3.102v.922h-5.383c.073.552.292.995.657 1.328.369.333.836.5 1.398.5.87 0 1.55-.315 2.039-.945l1.11 1.242c-.339.479-.797.854-1.375 1.125a4.553 4.553 0 0 1-1.922.398Zm-.258-6.937c-.448 0-.813.15-1.094.453-.276.302-.453.734-.531 1.297h3.141v-.18c-.011-.5-.146-.885-.407-1.156-.26-.276-.63-.414-1.109-.414ZM245.944 12.047c0-1.318.294-2.367.883-3.149.593-.78 1.403-1.171 2.429-1.171.823 0 1.503.307 2.039.921V4.336h2.266v12h-2.039l-.11-.898c-.562.703-1.286 1.054-2.171 1.054-.995 0-1.795-.39-2.399-1.172-.599-.786-.898-1.877-.898-3.273Zm2.258.164c0 .792.138 1.398.414 1.82.276.422.677.633 1.203.633.698 0 1.19-.294 1.476-.883v-3.336c-.281-.588-.768-.883-1.461-.883-1.088 0-1.632.883-1.632 2.649ZM256.583 12.047c0-1.297.307-2.341.922-3.133.619-.792 1.453-1.187 2.5-1.187.927 0 1.648.317 2.164.953l.093-.797h2.047v8.172c0 .74-.169 1.383-.507 1.93a3.215 3.215 0 0 1-1.415 1.25c-.609.286-1.322.43-2.14.43-.62 0-1.224-.126-1.813-.376-.588-.245-1.033-.562-1.336-.953l1-1.375c.563.63 1.245.945 2.047.945.599 0 1.065-.161 1.399-.484.333-.318.5-.771.5-1.36v-.453c-.521.589-1.206.883-2.055.883-1.016 0-1.838-.396-2.469-1.187-.625-.797-.937-1.852-.937-3.164v-.094Zm2.258.164c0 .766.153 1.367.461 1.805.307.432.729.648 1.265.648.688 0 1.18-.258 1.477-.773v-3.555c-.302-.516-.789-.774-1.461-.774-.542 0-.969.222-1.281.665-.308.442-.461 1.104-.461 1.984ZM271.542 16.492c-1.239 0-2.25-.38-3.031-1.14-.776-.76-1.164-1.774-1.164-3.04v-.218c0-.85.164-1.607.492-2.274.328-.672.792-1.187 1.391-1.547.604-.364 1.291-.546 2.062-.546 1.156 0 2.065.364 2.727 1.093.666.73 1 1.763 1 3.102v.922h-5.383c.073.552.292.995.656 1.328.37.333.836.5 1.399.5.869 0 1.549-.315 2.039-.945l1.109 1.242c-.338.479-.797.854-1.375 1.125a4.55 4.55 0 0 1-1.922.398Zm-.258-6.937c-.448 0-.812.15-1.093.453-.276.302-.453.734-.532 1.297h3.141v-.18c-.01-.5-.146-.885-.406-1.156-.261-.276-.63-.414-1.11-.414Z"
              fill="var(--body-text)"
            />
          </svg>
        </Link>
      </div>
      <div className="px-2 mx-2 navbar-start md:hidden sm:visible">
        <Link to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="152"
            height="24"
            fill="none"
          >
            <path
              fill="#FF6900"
              d="M4.472 6.154L2.577 4.49l1.986-1.951 1.693 1.86a9.78 9.78 0 011.078-.71L6.232 1.442 8.826.384l.84 2.356c.418-.11.844-.193 1.274-.248L10.798 0h2.81l-.155 2.492c.43.055.856.138 1.275.248l.839-2.356 2.595 1.057-1.075 2.248c.374.212.734.45 1.078.71l1.692-1.861 1.987 1.951-1.896 1.665c.265.337.507.691.724 1.06l2.289-1.081 1.075 2.55-2.407.825c.111.41.195.828.251 1.25l2.537-.139v2.762l-2.537-.14c-.055.423-.14.84-.251 1.251l2.398.825-1.075 2.55-2.29-1.082c-.217.37-.458.724-.723 1.06l1.895 1.666-1.986 1.951-1.692-1.86a9.77 9.77 0 01-1.078.71l1.102 2.247-2.595 1.057-.839-2.356c-.419.11-.845.193-1.275.248L13.614 24h-2.81l.142-2.492a9.971 9.971 0 01-1.275-.248l-.838 2.356-2.595-1.057L7.34 20.31a9.761 9.761 0 01-1.078-.71l-1.693 1.861-1.986-1.951 1.895-1.665a9.568 9.568 0 01-.723-1.06l-2.29 1.081-1.074-2.55 2.398-.825a9.367 9.367 0 01-.252-1.25L0 13.38v-2.765l2.537.14c.056-.423.14-.84.252-1.251L.39 8.68l1.075-2.55 2.298 1.085c.212-.37.449-.723.708-1.06zm1.817 5.843a5.893 5.893 0 00.953 3.304 5.928 5.928 0 009.114.993A5.9 5.9 0 0017.68 9.85a5.906 5.906 0 00-2.178-2.664 5.926 5.926 0 00-3.296-1.002A5.883 5.883 0 008.04 7.868a5.858 5.858 0 00-1.752 4.129zm134.983-6.224l9.387 9.272V6.254H152v11.86l-9.387-9.256v8.746h-1.341V5.774zm-16.39 6.152c0 2.558 2.201 4.694 4.932 4.694 2.731 0 4.93-2.136 4.93-4.694 0-2.56-2.171-4.698-4.93-4.698-2.758 0-4.932 2.126-4.932 4.697zm11.203.015c0 3.265-2.84 5.855-6.271 5.855-3.43 0-6.271-2.59-6.271-5.855 0-3.266 2.841-5.886 6.271-5.886 3.431 0 6.271 2.638 6.271 5.889v-.003zm-18.149-3.475c-.479-.782-1.054-1.235-2.075-1.235-1.068 0-1.995.722-1.995 1.76 0 .98 1.069 1.43 1.883 1.777l.8.333c1.565.646 2.888 1.383 2.888 3.19 0 1.988-1.692 3.508-3.781 3.508-1.932 0-3.368-1.176-3.749-2.937l1.308-.347a2.417 2.417 0 002.422 2.114c1.293 0 2.474-.933 2.474-2.211 0-1.278-1.102-1.777-2.219-2.257l-.733-.302c-1.405-.604-2.616-1.278-2.616-2.903 0-1.762 1.58-2.892 3.367-2.892a3.49 3.49 0 013.113 1.762l-1.087.64zm-15.567 3.043h.409c1.514 0 3.046-.272 3.046-2.034 0-1.867-1.454-2.048-3.065-2.048h-.399l.009 4.082zm0 6.096h-1.341V6.254h1.75c2.283 0 4.402.57 4.402 3.13 0 1.746-1.165 2.979-3.028 3.13l3.834 5.09h-1.644l-3.634-4.982h-.336l-.003 4.982zM89.588 6.254h6.225v1.172h-4.887v3.375h4.754v1.175h-4.754v4.456h4.887v1.175h-6.225V6.254zm-9.69 5.208h.909c1.484 0 2.743-.423 2.743-2.048 0-1.852-1.58-1.988-3.143-1.988h-.493l-.016 4.036zm0 6.142h-1.344V6.254h1.98c1.036 0 2.12.03 2.983.604a3.075 3.075 0 011.356 2.59 3.106 3.106 0 01-1.147 2.437c-.815.632-1.85.752-2.855.752h-.975l.002 4.967zM68.865 8.181v2.499h3.585v1.927h-3.585v3.073h3.724v1.927h-5.977V6.254h5.977V8.18h-3.724zm-11.616 4.834l2.753-6.75h2.422l-5.13 11.97-5.083-11.981h2.422l2.616 6.761zm-9.217 4.592H45.78V6.254h2.252v11.353zm-9.75-1.927h3.189v1.927h-5.45V6.254h2.261v9.426z"
            ></path>
          </svg>
        </Link>
      </div>
      <div className="searchcomponent hidden w-6/12 navbar-center lg:flex">
        <div className="flex items-stretch w-full flex-col relative">
          <InstantSearch
            indexName="helpcenter_gatsby"
            searchClient={searchClient}
            onSearchParameters={() => {
              searchClient.clearCache()
            }}
            // refresh={true}
            searchable={true}
          >
            <SearchBox
              submit={
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity={0.9} fill="#494B51">
                    <path d="M7 3.5a.5.5 0 01.5-.5c1.163 0 2.283.576 3.104 1.396C11.424 5.216 12 6.337 12 7.5a.5.5 0 01-1 0c0-.837-.424-1.717-1.104-2.396C9.216 4.424 8.337 4 7.5 4a.5.5 0 01-.5-.5z" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.326 11.855a6.5 6.5 0 10-.716.682.501.501 0 00.056.066l3.043 3.043a.5.5 0 10.707-.707l-3.043-3.043a.514.514 0 00-.047-.041zM7.5 13a5.5 5.5 0 100-11 5.5 5.5 0 000 11z"
                    />
                  </g>
                </svg>
              }
              style={{ borderRadius: `32px` }}
              type="text"
              placeholder="SEARCH"
              className="input input-card-border input-bordered w-full rounded-full"
            />

            <Index indexName="helpcenter_gatsby">
              <IndexResults>
                <div
                  className="right-panel shadow"
                  style={{
                    background: "var(--body-background)",
                    color: "var(--body-text)",
                    borderRadius: 5,
                    zIndex: 9999,
                    position: "absolute",
                    top: "3rem",
                    width: "100%",
                    maxHeight: "75vh",
                    overflowY: "auto",
                  }}
                >
                  {/* <CustomHits  /> */}
                  {/* <Hits hitComponent={Hit} /> */}
                  <CustomHits />
                </div>
              </IndexResults>
            </Index>
          </InstantSearch>
        </div>
      </div>
      <div className="navbar-end gap-2">
        <div className="sm:hidden">
          <ThemeToggle />
        </div>
        <label
          htmlFor="my-drawer-2"
          className="my-4 btn btn-primary rounded-full drawer-button lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>{" "}
          </svg>
        </label>
        <a
          href="https://liveengage.liveperson.net/"
          className="btn btn-ghost normal-case rounded-full sm:hidden"
        >
          Sign in
        </a>
        <a
          target="_blank"
          href="https://developers.liveperson.com/register.html"
          className="btn btn-secondary normal-case rounded-full px-5 sm:hidden"
        >
          Free trial
        </a>
      </div>
    </header>
  )
}

const Hit = props => {
  // console.log(props.hits)
  return (
    <div>
      {props?.hits?.length > 0
        ? props.hits.map((pP, index) => {
            // console.log(pP, index)
            return (
              <div
                style={{
                  zIndex: 1,
                  padding: "1rem",
                  boxShadow: "inset 0px -1px 1px rgba(0, 0, 0, 0.1)",
                }}
                key={index}
              >
                <Link to={`/${pP.elements.permalink.value}`}>
                  <div className="hit-name">
                    <p className="font-bold" attribute="name">
                      {pP.elements.pagename.value}
                    </p>
                  </div>
                  <div className="hit-description text-body-text">
                    <RichTextElement value={pP.elements.subtitle.value} />
                  </div>
                </Link>
              </div>
            )
          })
        : null}
    </div>
  )
}

const CustomHits = connectHits(Hit)
