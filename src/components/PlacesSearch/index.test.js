const rewire = require("rewire")
const index = rewire("./index")
const mapboxGeocoding = index.__get__("mapboxGeocoding")
const getSuggestionValue = index.__get__("getSuggestionValue")
const styles = index.__get__("styles")
// @ponicode
describe("mapboxGeocoding", () => {
    test("0", () => {
        let callFunction = () => {
            mapboxGeocoding("DELETE FROM Projects WHERE pid = %s")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            mapboxGeocoding("UNLOCK TABLES;")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            mapboxGeocoding("SELECT * FROM Movies WHERE Title=’Jurassic Park’ AND Director='Steven Spielberg';")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            mapboxGeocoding("DROP TABLE tmp;")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            mapboxGeocoding("UPDATE Projects SET pname = %s WHERE pid = %s")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            mapboxGeocoding(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("getSuggestionValue", () => {
    test("0", () => {
        let callFunction = () => {
            getSuggestionValue({ label: "ISO 22000" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            getSuggestionValue({ label: "label_1" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            getSuggestionValue({ label: "ISO 9001" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            getSuggestionValue({ label: "label_2" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            getSuggestionValue({ label: "label_3" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            getSuggestionValue(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("styles", () => {
    test("0", () => {
        let callFunction = () => {
            styles({ spacing: { unit: "Anas" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            styles({ spacing: { unit: "Jean-Philippe" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            styles({ spacing: { unit: "Michael" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            styles({ spacing: { unit: "Pierre Edouard" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            styles({ spacing: { unit: "Edmond" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            styles(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
