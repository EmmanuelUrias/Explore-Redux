// DOM elements
const valueEl = document.getElementById('value')
const plusBtn = document.getElementById('plus')
const minusBtn = document.getElementById('minus')
const plusFiveBtn = document.getElementById('plus5')
const minusFiveBtn = document.getElementById('minus5')
const customNumInput = document.getElementById('customNum')
const customNumBtn = document.getElementById('inputSubmit')
const addIfOddBtn = document.getElementById('IncrementIfOdd')
const addIfAsyncBtn = document.getElementById('IncrementIfAsync')

// initial state value
const initialState = {
    value: 0
}

// reducer
const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'counter/incremented':
            return { value: state.value + 1 }
        case 'counter/decremented':
            return { value: state.value - 1 }
        case 'counter/incrementBy5' :
            return { value: state.value + 5 }
        case 'counter/decrementBy5': 
            return { value: state.value - 5 }
        case 'counter/incrementIfOdd':
            if (state.value % 2 == 0) {
              return state
            } else {
              return { value: state.value + 1 }
            }
        case 'counter/custom':
          return { value: state.value + action.payload }
        default:
        return state
    }
}

// action object definitions
const addAction = {
  type: 'counter/incremented'
}

const subAction = {
  type: 'counter/decremented'
}

const addFiveAction = {
  type: 'counter/incrementBy5'
}

const subFiveAction = {
  type: 'counter/decrementBy5'
}

const addIfOddAction = {
  type: 'counter/incrementIfOdd'
}

const addCustomAction = {
  type: 'counter/custom'
}

// generating the store
let store = Redux.createStore(counterReducer)

// defining render
const render = () => {
    const state = store.getState()
    valueEl.innerHTML = state.value.toString()
}

// establishing dispatch functions
const addOne = () => {
  store.dispatch(addAction)
}

const subOne = () => {
  store.dispatch(subAction)
}

const addFive = () => {
  store.dispatch(addFiveAction)
}

const subFive = () => {
  store.dispatch(subFiveAction)
}

const addIfOdd = () => {
  store.dispatch(addIfOddAction)
}

const addIfAsync = () => {
  setTimeout(() => {
    store.dispatch(addAction)
  }, 1000)
}

const addCustom = () => {
  let num = Number (customNumInput.value) // you can replace 'Number' with +

  store.dispatch({...addCustomAction, payload: num})
}

// event listeners
plusBtn.addEventListener('click', addOne)
minusBtn.addEventListener('click', subOne)
plusFiveBtn.addEventListener('click', addFive)
minusFiveBtn.addEventListener('click', subFive)
addIfOddBtn.addEventListener('click', addIfOdd)
addIfAsyncBtn.addEventListener('click', addIfAsync)
customNumBtn.addEventListener('click', addCustom)

// initial render
render()

// subscribe reruns render on dispatch
store.subscribe(render)