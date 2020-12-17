import react from 'react'
import Products from "./components/Components";
import Hello from './Hello'
import Filter from "./components/Filter";


class App extends react.Component {
    constructor() {
        super();
        this.state = {
            products: Hello.products,
            size: "",
            sort: ""
        };
    }

    sortProducts = (event) => {
        debugger;
        const sort = event.target.value;
        this.setState((state) => ({
            sort: sort,
            products: this.state.products.slice().sort((a, b) =>
            sort === "Lowest"
                    ? a.price > b.price
                    ? 1
                    : -1
                    : sort === "Highest"
                    ? a.price < b.price
                        ? 1
                        : -1
                    : a._id > b._id
                        ? 1
                        : -1
            ),
        }))
    }


    filterProducts = (size) => {
        if (size.target.value === "") {
            this.setState({size: size.target.value, products: Hello.products})
        } else {
            this.setState({
                size: size.target.value,
                products: Hello.products.filter(product => product.availableSizes.indexOf(size.target.value) >= 0)
            })
        }
    }

    render() {
        return (
            <div className="grid-container">
                <header>
                    <a href="/">React Shopping Cart</a>
                </header>
                <main>
                    <div className="content">
                        <div className="main">
                            <Filter count={this.state.products.length}
                                    size={this.state.size} sort={this.state.sort}
                                    filterProducts={this.filterProducts}
                                    sortProducts={this.sortProducts}></Filter>
                            <Products products={this.state.products}></Products>
                        </div>
                        <div className="sidebar">
                            Cart Items
                        </div>
                    </div>
                </main>
                <footer>
                    All right is reserved.
                </footer>
            </div>
        );
    }
}

export default App;
