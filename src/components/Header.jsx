import React, { useState, useRef, useEffect } from "react"
import { Link } from "gatsby"
import algoliasearch from "algoliasearch/lite"
import {
  InstantSearch,
  connectHits,
  connectStateResults,
  Index,
  SearchBox,
  Highlight,
} from "react-instantsearch-dom"
import HeaderMobile from "./widgets/HeaderMobile"

let appId = process.env.GATSBY_ALGOLIA_APP_ID
let apiKey = process.env.GATSBY_ALGOLIA_APP_KEY

const searchClient = algoliasearch(appId, apiKey)

export default function Header() {
  const [redirectStatus, setRedirectStatus] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        setRedirectStatus(true)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref])

  const IndexResults = connectStateResults(
    ({ searchState, searchResults, children }) => {
      if (redirectStatus) {
        searchState.query = ""
      }
      return searchResults && searchResults.nbHits !== 0 && searchState.query
        ? children
        : null
    }
  )

  return (
    <header className="z-50 sticky top-0 w-full bg-body-background smobile:px-5 px-8 md:px-0">
      <div className="navbar max-width justify-between gap-8">
        <div className="px-2 lmobile:hidden md:pl-0 md:ml-0 w-80">
          <Link to="/">
            {/* logo svg */}
            <svg
              width="281"
              height="28"
              viewBox="0 0 281 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.47228 8.15408L2.57678 6.48943L4.56312 4.53776L6.25574 6.39879C6.59883 6.13848 6.95894 5.90129 7.33369 5.68882L6.23151 3.44109L8.82647 2.38369L9.66521 4.74018C10.0842 4.62975 10.5101 4.54699 10.94 4.49245L10.7977 2H13.6076L13.4532 4.49245C13.8831 4.54714 14.3089 4.6299 14.7279 4.74018L15.5667 2.38369L18.1616 3.44109L17.0867 5.68882C17.4613 5.90148 17.8214 6.13866 18.1647 6.39879L19.8573 4.53776L21.8436 6.48943L19.9481 8.15408C20.213 8.49093 20.4547 8.8452 20.6718 9.2145L22.9609 8.13293L24.0359 10.6828L21.6286 11.5076C21.7402 11.9184 21.8242 12.3363 21.88 12.7583L24.4174 12.6193V15.3807L21.88 15.2417C21.8245 15.6638 21.7405 16.0816 21.6286 16.4924L24.0268 17.3172L22.9518 19.8671L20.6627 18.7855C20.4454 19.1546 20.2036 19.5089 19.939 19.8459L21.8345 21.5106L19.8482 23.4622L18.1556 21.6012C17.8124 21.8613 17.4523 22.0985 17.0776 22.3112L18.1798 24.5589L15.5848 25.6163L14.7461 23.2598C14.3271 23.3701 13.9012 23.4529 13.4713 23.5076L13.6137 26H10.8037L10.946 23.5076C10.5162 23.4528 10.0903 23.37 9.67126 23.2598L8.83253 25.6163L6.23757 24.5589L7.33974 22.3112C6.96511 22.0985 6.605 21.8614 6.2618 21.6012L4.56917 23.4622L2.58284 21.5106L4.47833 19.8459C4.2136 19.509 3.97183 19.1547 3.75465 18.7855L1.46553 19.8671L0.390603 17.3172L2.78874 16.4924C2.67664 16.0817 2.59267 15.6638 2.53742 15.2417L0 15.3807V12.6163L2.53742 12.7553C2.59266 12.3332 2.67663 11.9153 2.78874 11.5045L0.390603 10.6798L1.46553 8.12991L3.76374 9.2145C3.97616 8.84578 4.21285 8.49153 4.47228 8.15408ZM6.28905 13.997C6.27102 15.1682 6.60265 16.3184 7.24172 17.301C7.88079 18.2837 8.79841 19.0544 9.87782 19.5151C10.9572 19.9759 12.1496 20.1058 13.3032 19.8883C14.4569 19.6709 15.5196 19.1159 16.3561 18.2941C17.1927 17.4722 17.7653 16.4206 18.0011 15.273C18.2368 14.1255 18.1251 12.9339 17.68 11.8499C17.235 10.766 16.4769 9.83858 15.502 9.18582C14.5271 8.53306 13.3797 8.18443 12.2057 8.18429C11.4346 8.17832 10.67 8.32393 9.95537 8.61282C9.24075 8.9017 8.59016 9.3282 8.04074 9.86796C7.49133 10.4077 7.05386 11.0502 6.7533 11.7586C6.45274 12.4671 6.29499 13.2277 6.28905 13.997ZM141.272 7.77341L150.659 17.0453V8.25378H152V20.1148L142.613 10.858V19.6042H141.272V7.77341ZM124.882 13.9245C124.882 16.4834 127.083 18.6193 129.814 18.6193C132.545 18.6193 134.744 16.4834 134.744 13.9245C134.744 11.3656 132.573 9.22658 129.814 9.22658C127.056 9.22658 124.882 11.3535 124.882 13.9245ZM136.085 13.9396C136.085 17.2054 133.245 19.7946 129.814 19.7946C126.384 19.7946 123.543 17.2054 123.543 13.9396C123.543 10.6737 126.384 8.05438 129.814 8.05438C133.245 8.05438 136.085 10.6918 136.085 13.9426V13.9396ZM117.936 10.4653C117.457 9.68278 116.882 9.22961 115.861 9.22961C114.793 9.22961 113.866 9.95166 113.866 10.9909C113.866 11.9698 114.935 12.4199 115.749 12.7674L116.549 13.0997C118.114 13.7462 119.437 14.4834 119.437 16.29C119.437 18.2779 117.745 19.7976 115.656 19.7976C113.724 19.7976 112.288 18.6224 111.907 16.861L113.215 16.5136C113.289 17.1009 113.577 17.6407 114.023 18.0305C114.47 18.4203 115.044 18.633 115.637 18.6284C116.93 18.6284 118.111 17.6949 118.111 16.4169C118.111 15.139 117.009 14.6405 115.892 14.1601L115.159 13.858C113.754 13.2538 112.543 12.5801 112.543 10.9547C112.543 9.19335 114.123 8.06344 115.91 8.06344C116.54 8.04884 117.162 8.20492 117.71 8.51507C118.258 8.82522 118.712 9.27785 119.023 9.82477L117.936 10.4653ZM102.369 13.5076H102.778C104.292 13.5076 105.824 13.2356 105.824 11.4743C105.824 9.60725 104.37 9.42598 102.759 9.42598H102.36L102.369 13.5076ZM102.369 19.6042H101.028V8.25378H102.778C105.061 8.25378 107.18 8.82477 107.18 11.3837C107.18 13.1299 106.015 14.3625 104.152 14.5136L107.986 19.6042H106.342L102.708 14.6224H102.372L102.369 19.6042ZM89.5879 8.25378H95.8134V9.42598H90.9263V12.8006H95.6802V13.9758H90.9263V18.432H95.8134V19.6073H89.5879V8.25378ZM79.8985 13.4622H80.8069C82.2906 13.4622 83.5502 13.0393 83.5502 11.4139C83.5502 9.56193 81.9696 9.42598 80.4072 9.42598H79.9136L79.8985 13.4622ZM79.8985 19.6042H78.5541V8.25378H80.5344C81.5699 8.25378 82.6539 8.28399 83.5169 8.85801C83.9406 9.14332 84.2865 9.5294 84.5233 9.9814C84.7601 10.4334 84.8804 10.9371 84.8734 11.4471C84.8774 11.9133 84.7763 12.3745 84.5777 12.7965C84.3791 13.2185 84.0879 13.5905 83.7258 13.8852C82.9113 14.5166 81.8757 14.6375 80.8705 14.6375H79.8955L79.8985 19.6042ZM68.8646 10.1813V12.6798H72.4497V14.6073H68.8646V17.6798H72.589V19.6073H66.6118V8.25378H72.589V10.1813H68.8646ZM57.2494 15.0151L60.0018 8.26586H62.4242L57.2948 20.2356L52.2109 8.25378H54.6333L57.2494 15.0151ZM48.0324 19.6073H45.7796V8.25378H48.0324V19.6073ZM38.2824 17.6798H41.4708V19.6073H36.0205V8.25378H38.2824V17.6798Z"
                fill="#FA772E"
              />
              <line x1="168.5" y1="2" x2="168.5" y2="26" stroke="#C6C9D2" />
              <path
                d="M185.242 20V7.4H187.42V12.53H187.726L192.118 7.4H194.908L189.418 13.61L195.088 20H192.226L187.726 14.762H187.42V20H185.242ZM196.511 20V11.108H198.545V12.35H198.851C199.007 12.014 199.289 11.696 199.697 11.396C200.105 11.096 200.723 10.946 201.551 10.946C202.235 10.946 202.841 11.102 203.369 11.414C203.897 11.726 204.305 12.158 204.593 12.71C204.893 13.262 205.043 13.916 205.043 14.672V20H202.973V14.834C202.973 14.114 202.793 13.58 202.433 13.232C202.085 12.872 201.587 12.692 200.939 12.692C200.207 12.692 199.631 12.938 199.211 13.43C198.791 13.91 198.581 14.6 198.581 15.5V20H196.511ZM211.797 20.252C210.909 20.252 210.111 20.072 209.403 19.712C208.707 19.34 208.155 18.818 207.747 18.146C207.351 17.462 207.153 16.646 207.153 15.698V15.41C207.153 14.462 207.351 13.646 207.747 12.962C208.155 12.278 208.707 11.756 209.403 11.396C210.111 11.036 210.909 10.856 211.797 10.856C212.685 10.856 213.477 11.036 214.173 11.396C214.869 11.756 215.415 12.278 215.811 12.962C216.219 13.646 216.423 14.462 216.423 15.41V15.698C216.423 16.646 216.219 17.462 215.811 18.146C215.415 18.818 214.869 19.34 214.173 19.712C213.477 20.072 212.685 20.252 211.797 20.252ZM211.797 18.416C212.553 18.416 213.171 18.176 213.651 17.696C214.131 17.204 214.371 16.52 214.371 15.644V15.464C214.371 14.588 214.131 13.91 213.651 13.43C213.171 12.938 212.553 12.692 211.797 12.692C211.041 12.692 210.423 12.938 209.943 13.43C209.463 13.91 209.223 14.588 209.223 15.464V15.644C209.223 16.52 209.463 17.204 209.943 17.696C210.423 18.176 211.041 18.416 211.797 18.416ZM219.4 20L218.014 11.108H220.066L221.02 18.614H221.326L222.676 11.108H225.988L227.338 18.614H227.644L228.598 11.108H230.65L229.264 20H225.826L224.494 12.494H224.188L222.838 20H219.4ZM232.74 20V7.4H234.81V20H232.74ZM241.501 20.252C240.613 20.252 239.827 20.066 239.143 19.694C238.471 19.31 237.943 18.776 237.559 18.092C237.187 17.396 237.001 16.586 237.001 15.662V15.446C237.001 14.51 237.187 13.7 237.559 13.016C237.931 12.332 238.453 11.804 239.125 11.432C239.797 11.048 240.571 10.856 241.447 10.856C242.311 10.856 243.067 11.048 243.715 11.432C244.363 11.804 244.867 12.332 245.227 13.016C245.587 13.7 245.767 14.498 245.767 15.41V16.148H239.089C239.113 16.844 239.359 17.402 239.827 17.822C240.295 18.242 240.871 18.452 241.555 18.452C242.227 18.452 242.725 18.308 243.049 18.02C243.373 17.72 243.619 17.384 243.787 17.012L245.497 17.894C245.329 18.218 245.083 18.566 244.759 18.938C244.447 19.298 244.027 19.61 243.499 19.874C242.971 20.126 242.305 20.252 241.501 20.252ZM239.107 14.582H243.661C243.613 13.994 243.385 13.526 242.977 13.178C242.581 12.83 242.065 12.656 241.429 12.656C240.769 12.656 240.241 12.83 239.845 13.178C239.449 13.526 239.203 13.994 239.107 14.582ZM251.528 20.252C250.808 20.252 250.136 20.078 249.512 19.73C248.888 19.37 248.39 18.848 248.018 18.164C247.646 17.48 247.46 16.658 247.46 15.698V15.41C247.46 14.45 247.646 13.628 248.018 12.944C248.39 12.26 248.882 11.744 249.494 11.396C250.118 11.036 250.796 10.856 251.528 10.856C252.08 10.856 252.548 10.922 252.932 11.054C253.316 11.186 253.622 11.354 253.85 11.558C254.09 11.762 254.276 11.984 254.408 12.224H254.714V7.4H256.766V20H254.75V18.83H254.444C254.228 19.19 253.898 19.52 253.454 19.82C253.01 20.108 252.368 20.252 251.528 20.252ZM252.14 18.452C252.884 18.452 253.502 18.212 253.994 17.732C254.486 17.24 254.732 16.544 254.732 15.644V15.464C254.732 14.552 254.486 13.856 253.994 13.376C253.514 12.896 252.896 12.656 252.14 12.656C251.396 12.656 250.772 12.896 250.268 13.376C249.776 13.856 249.53 14.552 249.53 15.464V15.644C249.53 16.544 249.776 17.24 250.268 17.732C250.772 18.212 251.396 18.452 252.14 18.452ZM258.956 15.59V15.32C258.956 14.384 259.142 13.586 259.514 12.926C259.886 12.254 260.384 11.744 261.008 11.396C261.632 11.036 262.316 10.856 263.06 10.856C263.9 10.856 264.536 11.006 264.968 11.306C265.412 11.606 265.736 11.93 265.94 12.278H266.246V11.108H268.262V21.692C268.262 22.28 268.094 22.742 267.758 23.078C267.422 23.426 266.966 23.6 266.39 23.6H260.414V21.8H265.688C266.036 21.8 266.21 21.62 266.21 21.26V18.686H265.904C265.772 18.89 265.592 19.1 265.364 19.316C265.136 19.52 264.836 19.694 264.464 19.838C264.092 19.982 263.624 20.054 263.06 20.054C262.316 20.054 261.632 19.88 261.008 19.532C260.384 19.172 259.886 18.662 259.514 18.002C259.142 17.33 258.956 16.526 258.956 15.59ZM263.636 18.236C264.38 18.236 264.998 18.002 265.49 17.534C265.982 17.054 266.228 16.388 266.228 15.536V15.356C266.228 14.492 265.982 13.826 265.49 13.358C265.01 12.89 264.392 12.656 263.636 12.656C262.892 12.656 262.268 12.89 261.764 13.358C261.272 13.826 261.026 14.492 261.026 15.356V15.536C261.026 16.388 261.272 17.054 261.764 17.534C262.268 18.002 262.892 18.236 263.636 18.236ZM274.952 20.252C274.064 20.252 273.278 20.066 272.594 19.694C271.922 19.31 271.394 18.776 271.01 18.092C270.638 17.396 270.452 16.586 270.452 15.662V15.446C270.452 14.51 270.638 13.7 271.01 13.016C271.382 12.332 271.904 11.804 272.576 11.432C273.248 11.048 274.022 10.856 274.898 10.856C275.762 10.856 276.518 11.048 277.166 11.432C277.814 11.804 278.318 12.332 278.678 13.016C279.038 13.7 279.218 14.498 279.218 15.41V16.148H272.54C272.564 16.844 272.81 17.402 273.278 17.822C273.746 18.242 274.322 18.452 275.006 18.452C275.678 18.452 276.176 18.308 276.5 18.02C276.824 17.72 277.07 17.384 277.238 17.012L278.948 17.894C278.78 18.218 278.534 18.566 278.21 18.938C277.898 19.298 277.478 19.61 276.95 19.874C276.422 20.126 275.756 20.252 274.952 20.252ZM272.558 14.582H277.112C277.064 13.994 276.836 13.526 276.428 13.178C276.032 12.83 275.516 12.656 274.88 12.656C274.22 12.656 273.692 12.83 273.296 13.178C272.9 13.526 272.654 13.994 272.558 14.582Z"
                fill="var(--body-text)"
              />
            </svg>
          </Link>
        </div>
        <div className="navbar-start hidden lmobile:visible lmobile:flex w-auto">
          {/* logo mobile */}
          <Link to="/">
            <svg
              width="161"
              height="32"
              viewBox="0 0 161 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.24962 15.9997C8.24962 20.2805 11.7194 23.75 15.9996 23.75C20.2797 23.75 23.7495 20.2805 23.7495 15.9997C23.7495 11.7204 20.2797 8.25055 15.9996 8.25055C11.7194 8.25055 8.24962 11.7204 8.24962 15.9997ZM5.86653 8.20662L3.38442 5.98837L5.98803 3.38518L8.20637 5.86728C8.66051 5.51703 9.13257 5.20117 9.61943 4.92085L8.17706 1.9232L11.5774 0.513817L12.6766 3.65567C13.2269 3.50771 13.7844 3.39819 14.3455 3.32536L14.1597 0H17.84L17.6534 3.32536C18.2156 3.39819 18.7728 3.50858 19.3222 3.65567L20.4217 0.513817L23.8232 1.9232L22.3797 4.92085C22.8663 5.20204 23.3392 5.51761 23.7936 5.86815L26.0125 3.38518L28.6147 5.98779L26.1329 8.20662C26.4829 8.66091 26.799 9.13369 27.0793 9.62034L30.077 8.17715L31.4858 11.5782L28.345 12.6778C28.4921 13.2269 28.6019 13.7849 28.6751 14.3458L32 14.16V17.8414L28.6751 17.6547C28.6019 18.2157 28.4921 18.7737 28.3441 19.323L31.4858 20.4232L30.077 23.8237L27.0793 22.3797C26.7982 22.8669 26.4823 23.3391 26.1326 23.794L28.6147 26.0131L26.0125 28.6154L23.7936 26.1327C23.3392 26.483 22.8663 26.7988 22.3797 27.08L23.8232 30.0774L20.4217 31.4862L19.3222 28.3452C18.7728 28.4923 18.2156 28.6024 17.6534 28.6752L17.84 32H14.1597L14.3455 28.6752C13.7844 28.6024 13.2269 28.4923 12.6766 28.3452L11.5774 31.4862L8.17649 30.0774L9.61943 27.08C9.13257 26.7988 8.66051 26.483 8.20637 26.1327L5.98803 28.6154L3.38442 26.0131L5.86653 23.7934C5.51682 23.3391 5.20069 22.8669 4.91984 22.3797L1.92212 23.8228L0.513894 20.4218L3.65474 19.323C3.50706 18.7737 3.39722 18.2157 3.32466 17.6547L0 17.8414V14.16L3.32466 14.3458C3.39722 13.7849 3.50706 13.2269 3.65474 12.6778L0.513894 11.5782L1.92212 8.17715L4.91984 9.62034C5.20069 9.13369 5.51682 8.66091 5.86653 8.20662Z"
                fill="#FA772E"
              />
              <line x1="48.5" y1="4" x2="48.5" y2="28" stroke="#C6C9D2" />
              <path
                d="M65.242 22V9.4H67.42V14.53H67.726L72.118 9.4H74.908L69.418 15.61L75.088 22H72.226L67.726 16.762H67.42V22H65.242ZM76.5113 22V13.108H78.5453V14.35H78.8513C79.0073 14.014 79.2893 13.696 79.6973 13.396C80.1053 13.096 80.7233 12.946 81.5513 12.946C82.2353 12.946 82.8413 13.102 83.3693 13.414C83.8973 13.726 84.3053 14.158 84.5933 14.71C84.8933 15.262 85.0433 15.916 85.0433 16.672V22H82.9733V16.834C82.9733 16.114 82.7933 15.58 82.4333 15.232C82.0853 14.872 81.5873 14.692 80.9393 14.692C80.2073 14.692 79.6313 14.938 79.2113 15.43C78.7913 15.91 78.5813 16.6 78.5813 17.5V22H76.5113ZM91.7975 22.252C90.9095 22.252 90.1115 22.072 89.4035 21.712C88.7075 21.34 88.1555 20.818 87.7475 20.146C87.3515 19.462 87.1535 18.646 87.1535 17.698V17.41C87.1535 16.462 87.3515 15.646 87.7475 14.962C88.1555 14.278 88.7075 13.756 89.4035 13.396C90.1115 13.036 90.9095 12.856 91.7975 12.856C92.6855 12.856 93.4775 13.036 94.1735 13.396C94.8695 13.756 95.4155 14.278 95.8115 14.962C96.2195 15.646 96.4235 16.462 96.4235 17.41V17.698C96.4235 18.646 96.2195 19.462 95.8115 20.146C95.4155 20.818 94.8695 21.34 94.1735 21.712C93.4775 22.072 92.6855 22.252 91.7975 22.252ZM91.7975 20.416C92.5535 20.416 93.1715 20.176 93.6515 19.696C94.1315 19.204 94.3715 18.52 94.3715 17.644V17.464C94.3715 16.588 94.1315 15.91 93.6515 15.43C93.1715 14.938 92.5535 14.692 91.7975 14.692C91.0415 14.692 90.4235 14.938 89.9435 15.43C89.4635 15.91 89.2235 16.588 89.2235 17.464V17.644C89.2235 18.52 89.4635 19.204 89.9435 19.696C90.4235 20.176 91.0415 20.416 91.7975 20.416ZM99.4002 22L98.0142 13.108H100.066L101.02 20.614H101.326L102.676 13.108H105.988L107.338 20.614H107.644L108.598 13.108H110.65L109.264 22H105.826L104.494 14.494H104.188L102.838 22H99.4002ZM112.74 22V9.4H114.81V22H112.74ZM121.501 22.252C120.613 22.252 119.827 22.066 119.143 21.694C118.471 21.31 117.943 20.776 117.559 20.092C117.187 19.396 117.001 18.586 117.001 17.662V17.446C117.001 16.51 117.187 15.7 117.559 15.016C117.931 14.332 118.453 13.804 119.125 13.432C119.797 13.048 120.571 12.856 121.447 12.856C122.311 12.856 123.067 13.048 123.715 13.432C124.363 13.804 124.867 14.332 125.227 15.016C125.587 15.7 125.767 16.498 125.767 17.41V18.148H119.089C119.113 18.844 119.359 19.402 119.827 19.822C120.295 20.242 120.871 20.452 121.555 20.452C122.227 20.452 122.725 20.308 123.049 20.02C123.373 19.72 123.619 19.384 123.787 19.012L125.497 19.894C125.329 20.218 125.083 20.566 124.759 20.938C124.447 21.298 124.027 21.61 123.499 21.874C122.971 22.126 122.305 22.252 121.501 22.252ZM119.107 16.582H123.661C123.613 15.994 123.385 15.526 122.977 15.178C122.581 14.83 122.065 14.656 121.429 14.656C120.769 14.656 120.241 14.83 119.845 15.178C119.449 15.526 119.203 15.994 119.107 16.582ZM131.528 22.252C130.808 22.252 130.136 22.078 129.512 21.73C128.888 21.37 128.39 20.848 128.018 20.164C127.646 19.48 127.46 18.658 127.46 17.698V17.41C127.46 16.45 127.646 15.628 128.018 14.944C128.39 14.26 128.882 13.744 129.494 13.396C130.118 13.036 130.796 12.856 131.528 12.856C132.08 12.856 132.548 12.922 132.932 13.054C133.316 13.186 133.622 13.354 133.85 13.558C134.09 13.762 134.276 13.984 134.408 14.224H134.714V9.4H136.766V22H134.75V20.83H134.444C134.228 21.19 133.898 21.52 133.454 21.82C133.01 22.108 132.368 22.252 131.528 22.252ZM132.14 20.452C132.884 20.452 133.502 20.212 133.994 19.732C134.486 19.24 134.732 18.544 134.732 17.644V17.464C134.732 16.552 134.486 15.856 133.994 15.376C133.514 14.896 132.896 14.656 132.14 14.656C131.396 14.656 130.772 14.896 130.268 15.376C129.776 15.856 129.53 16.552 129.53 17.464V17.644C129.53 18.544 129.776 19.24 130.268 19.732C130.772 20.212 131.396 20.452 132.14 20.452ZM138.956 17.59V17.32C138.956 16.384 139.142 15.586 139.514 14.926C139.886 14.254 140.384 13.744 141.008 13.396C141.632 13.036 142.316 12.856 143.06 12.856C143.9 12.856 144.536 13.006 144.968 13.306C145.412 13.606 145.736 13.93 145.94 14.278H146.246V13.108H148.262V23.692C148.262 24.28 148.094 24.742 147.758 25.078C147.422 25.426 146.966 25.6 146.39 25.6H140.414V23.8H145.688C146.036 23.8 146.21 23.62 146.21 23.26V20.686H145.904C145.772 20.89 145.592 21.1 145.364 21.316C145.136 21.52 144.836 21.694 144.464 21.838C144.092 21.982 143.624 22.054 143.06 22.054C142.316 22.054 141.632 21.88 141.008 21.532C140.384 21.172 139.886 20.662 139.514 20.002C139.142 19.33 138.956 18.526 138.956 17.59ZM143.636 20.236C144.38 20.236 144.998 20.002 145.49 19.534C145.982 19.054 146.228 18.388 146.228 17.536V17.356C146.228 16.492 145.982 15.826 145.49 15.358C145.01 14.89 144.392 14.656 143.636 14.656C142.892 14.656 142.268 14.89 141.764 15.358C141.272 15.826 141.026 16.492 141.026 17.356V17.536C141.026 18.388 141.272 19.054 141.764 19.534C142.268 20.002 142.892 20.236 143.636 20.236ZM154.952 22.252C154.064 22.252 153.278 22.066 152.594 21.694C151.922 21.31 151.394 20.776 151.01 20.092C150.638 19.396 150.452 18.586 150.452 17.662V17.446C150.452 16.51 150.638 15.7 151.01 15.016C151.382 14.332 151.904 13.804 152.576 13.432C153.248 13.048 154.022 12.856 154.898 12.856C155.762 12.856 156.518 13.048 157.166 13.432C157.814 13.804 158.318 14.332 158.678 15.016C159.038 15.7 159.218 16.498 159.218 17.41V18.148H152.54C152.564 18.844 152.81 19.402 153.278 19.822C153.746 20.242 154.322 20.452 155.006 20.452C155.678 20.452 156.176 20.308 156.5 20.02C156.824 19.72 157.07 19.384 157.238 19.012L158.948 19.894C158.78 20.218 158.534 20.566 158.21 20.938C157.898 21.298 157.478 21.61 156.95 21.874C156.422 22.126 155.756 22.252 154.952 22.252ZM152.558 16.582H157.112C157.064 15.994 156.836 15.526 156.428 15.178C156.032 14.83 155.516 14.656 154.88 14.656C154.22 14.656 153.692 14.83 153.296 15.178C152.9 15.526 152.654 15.994 152.558 16.582Z"
                fill="var(--body-text)"
              />
            </svg>
          </Link>
        </div>
        <div className="searchcomponent hidden flex-grow navbar-center md:flex">
          <div className="flex items-stretch w-full flex-col relative">
            <InstantSearch
              indexName="helpcenter"
              searchClient={searchClient}
              onSearchStateChange={() => {
                setRedirectStatus(false)
              }}
              refresh={true}
              searchable={true}
            >
              <SearchBox
                submit={
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 19.6L16.5 15C17.5 13.7 18 12.2 18 10.5C18 6.4 14.6 3 10.5 3C6.4 3 3 6.4 3 10.5C3 14.6 6.4 18 10.5 18C12.2 18 13.8 17.4 15 16.5L19.5 21L21 19.6ZM10.5 16C7.5 16 5 13.5 5 10.5C5 7.5 7.5 5 10.5 5C13.5 5 16 7.5 16 10.5C16 13.5 13.5 16 10.5 16Z"
                      fill="var(--search-input-color)"
                    />
                  </svg>
                }
                style={{ borderRadius: `32px`, backgroundColor: "#EEEFF1" }}
                type="text"
                placeholder="SEARCH"
                className="search-input w-full rounded-full"
              />
              <div ref={ref}>
                <Index indexName="helpcenter">
                  <IndexResults>
                    <div
                      className="right-panel"
                      style={{
                        background: "var(--body-background)",
                        color: "var(--body-text)",
                        borderRadius: "2px",
                        zIndex: 9999,
                        position: "absolute",
                        top: "3rem",
                        width: "100%",
                        maxHeight: "75vh",
                        overflowY: "auto",
                        boxShadow: "0px 2px 8px var(--search-input-background)",
                      }}
                    >
                      <CustomHits onClose={() => setRedirectStatus(true)} />
                    </div>
                  </IndexResults>
                </Index>
              </div>
            </InstantSearch>
          </div>
        </div>
        <div className="gap-8 relative">
          <HeaderMobile />
          <label htmlFor="my-drawer-2" className="drawer-button md:hidden">
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
              ></path>
            </svg>
          </label>
          <a
            href="https://liveengage.liveperson.net/"
            target="_blank"
            rel="noreferrer"
            aria-label="Sign in"
            className="text-primary hover:text-primary-hover normal-case mobile:hidden"
            style={{ fontSize: "1.125rem", lineHeight: "1.75rem" }}
          >
            Sign in
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            aria-label="register"
            href="https://developers.liveperson.com/register.html"
            className="btn btn-primary btn-primary-hover normal-case rounded-full px-8 mobile:hidden"
          >
            Free trial
          </a>
        </div>
      </div>
    </header>
  )
}

const Hit = props => {
  return (
    <div>
      {props?.hits?.length > 0
        ? props.hits.map((pP, index) => {
            // console.log(pP.type)
            return (
              <div key={index} className="hit-block">
                <Link
                  to={
                    pP.type === "release-notes" || pP.type === "whats-new"
                      ? `/${pP.type}/${pP.link}`
                      : `/${pP.link}`
                  }
                  onClick={props.onClose}
                >
                  <div className="hit-name">
                    <p
                      className="font-bold text-body-text mb-1"
                      attribute="name"
                    >
                      <Highlight attribute="title" hit={pP} />
                    </p>
                  </div>
                  <Highlight
                    className="text-footer-text"
                    attribute="subtitle"
                    hit={pP}
                  />
                </Link>
              </div>
            )
          })
        : null}
    </div>
  )
}

const CustomHits = connectHits(props => <Hit {...props} />)
