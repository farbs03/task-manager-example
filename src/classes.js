//holds all the tailwind css styles for components in the website, allows for easy reusability of styles
const classes = {
    primaryButton: "py-2 px-4 bg-indigo-500 hover:bg-indigo-600 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none rounded",
    confirmButton: "mr-2 py-2 px-4 bg-indigo-500 hover:bg-indigo-600 text-white transition ease-in duration-200 text-center text-base focus:outline-none rounded",
    cancelButton: "py-2 px-4 bg-gray-500 hover:bg-gray-600 text-white transition ease-in duration-200 text-center text-base focus:outline-none rounded",
    
    textfield: "rounded-lg transition ease-in duration-200 border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-4 bg-transparent text-white placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
    textfieldIcon: "z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-4 py-2.5",
    textfieldWithIcon: "px-4 py-2 placeholder-gray-400 relative-lg bg-transparent rounded-lg text-sm border border-gray-400 outline-none focus:outline-none focus:ring w-full pl-10 transition ease-in duration-200 border-transparent text-white placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
    
    unselectedPriorityButton: "transition ease-in duration-100 block px-4 py-2 mt-2 text-sm font-semibold rounded-lg bg-gray-600 md:mt-0 hover:bg-gray-700 mr-1 ml-1",
    selectedPriorityButton: "transition ease-in duration-100 block px-4 py-2 mt-2 text-sm font-semibold rounded-lg bg-gray-700 text-indigo-400 md:mt-0 outline-none shadow-outline mr-1 ml-1",

    unselectedFilterOption: "transition ease-in duration-200 block px-4 py-2 mt-2 text-sm font-semibold rounded-lg bg-transparent md:mt-0 hover:bg-gray-800 mr-1 ml-1",
    selectedFilterOption: "transition ease-in duration-200 block px-4 py-2 mt-2 text-sm font-semibold rounded-lg bg-transparent border-2 border-indigo-500 md:mt-0 outline-none shadow-outline mr-1 ml-1 text-indigo-500",

    checkbox: "form-tick appearance-none h-5 w-5 text-indigo-500 rounded transition ease-in duration-200 bg-transparent bg-check border-2 border-gray-400 checked:bg-indigo-500 checked:border-transparent focus:border-transparent checked:outline-none focus:outline-none checked:ring-0 focus:ring-0",

    primaryBadge: "bg-indigo-300 text-indigo-800 text-xs font-semibold mr-2 px-1.5 py-0.5 rounded text-indigo-800",
    darkBadge: "text-xs font-semibold mr-2 px-2.5 py-0.5 rounded bg-gray-700 text-gray-300"
}
export default classes