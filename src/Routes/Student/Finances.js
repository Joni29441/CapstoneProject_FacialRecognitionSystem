import React, {useEffect, useState} from "react"
import finances from "../../Services/finances.json"
import {Link} from "react-router-dom";
import {listAllPersons} from "../../Services/Services";
import {FaCcMastercard, FaCcVisa} from "react-icons/fa";

function Finances() {
    const [response, setResponse] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await listAllPersons();
                setResponse(res.filter((item) => item.name === "Jon Fetahi"));
                console.log(response)
            } catch (e) {
                console.error(e)
            }
        }
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 py-10 px-8">
            <div className="flex-grow py-1 px-8 mx-auto max-w-7xl">
                <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-2">Your Finances</h2>
                <div className=" mx-auto">
                    <div className="mx-auto mb-14 mt-5">
                        <table className="w-full border-2 shadow-lg">
                            <thead className="bg-yale text-white ">
                            <tr className="text-center">
                                <th className="px-3 py-3">UUID</th>
                                <th className="px-3 py-3">Name</th>
                                <th className="px-3 py-3">Degree</th>
                            </tr>
                            </thead>
                            <tbody>
                            {response.map((it, index) => (
                                <tr key={index} className="text-center">
                                    <td className="px-3 py-3">{it.uuid}</td>
                                    <td className="px-3 py-3">{it.name}</td>
                                    <td className="px-3 py-3">Computer Sciences</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <table className="w-full border-2 shadow-md rounded-lg">
                        <thead className="border bg-yale">
                        <tr>
                            <th className="px-6 py-3 text-center text-white uppercase">#</th>
                            <th className="px-6 py-3 text-center text-white uppercase">Transaction No.</th>
                            <th className="px-6 py-3 text-center text-white uppercase">Description</th>
                            <th className="px-6 py-3 text-center text-white uppercase">Term</th>
                            <th className="px-6 py-3 text-center text-white uppercase">Amount</th>
                            <th className="px-6 py-3 text-center text-white uppercase">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {finances.map((finance, index) => (
                            <tr key={index}
                                className="text-center odd:bg-gray-100 even:bg-gray-200 hover:bg-gray-100 transition duration-150">
                                <td>{index + 1}</td>
                                <td>{finance.transactionNo}</td>
                                <td>{finance.description}</td>
                                <td>{finance.term}</td>
                                <td>{finance.amount}€</td>
                                <td>
                                    <button className="bg-blue-600 py-3 px-5 rounded-lg text-white">
                                        <Link to="/FinancesInfo">Pay</Link>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default Finances;