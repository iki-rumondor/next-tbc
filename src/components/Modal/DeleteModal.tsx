interface Props {
  toggleModal: () => void;
  handleSubmit?: () => void;
  isLoading?: boolean;
  title: string;
}

export default function DeleteModal({ props }: { props: Props }) {
  return (
    <div className="absolute z-999">
      <div
        className="fixed inset-0 bg-neutral-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
        onClick={props.toggleModal}
      ></div>

      <div
        id="popup-modal"
        tabIndex={-1}
        className="fixed inset-0 z-2 flex items-center justify-center overflow-y-auto overflow-x-hidden h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={props.toggleModal}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                {props.title}
              </h3>
              <button
                disabled={props.isLoading}
                onClick={props.handleSubmit}
                type="button"
                className="text-white bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 dark:focus:ring-rose-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              >
                {props.isLoading ? "Loading..." : "Ya"}
              </button>
              <button
                onClick={props.toggleModal}
                type="button"
                className="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-neutral-800 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
