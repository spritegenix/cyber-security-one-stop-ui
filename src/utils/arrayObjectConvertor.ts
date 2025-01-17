// function groups an array of objects by a specified key, returning an object where
//  each key is a unique value from the array's key and the corresponding value is 
// an array of objects that share that key.
type AnyObject = { [key: string]: any };
function groupByKey<T extends AnyObject>(array: T[], key: keyof T): Record<string, T[]> {
    if (!Array.isArray(array)) {
        throw new Error("The first argument must be an array.");
    }
    if (array.length === 0) {
        return {};
    }

    return array.reduce((result, item) => {
        if (item[key] === undefined) {
            throw new Error(`The key "${String(key)}" is missing in an object.`);
        }

        const groupKey = String(item[key]);
        const newItem = { ...item };
        delete newItem[key];

        if (!result[groupKey]) {
            result[groupKey] = [];
        }
        result[groupKey].push(newItem);

        return result;
    }, {} as Record<string, T[]>);
}

// Usage example
// const categories = [
//     { id: "9", masterCategory: "Cybersecurity", name: "Cyber Fraud" },
//     { id: "10", masterCategory: "Cybersecurity", name: "Data Security" },
//     { id: "11", masterCategory: "Forensics", name: "Digital Forensics" }
// ];

// {
//     Cybersecurity: [
//       { id: "9", name: "Cyber Fraud" },
//       { id: "10", name: "Data Security" }
//     ],
//     Forensics: [
//       { id: "11", name: "Digital Forensics" }
//     ]
//   }
// const grouped = groupByKey(categories, "masterCategory");
// console.log(grouped);
// ----------------------------------------------------------------------------- //