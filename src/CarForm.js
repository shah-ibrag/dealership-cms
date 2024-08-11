import { Header } from "./Header";

export default function CarForm() {
  return (
    <>
      <Header />
      <form>
        <div className="mb-4">
          <label htmlFor="make" className="block text-gray-700 font-bold mb-2">
            Make:
          </label>
          <input
            type="text"
            id="make"
            name="make"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter car make"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="model" className="block text-gray-700 font-bold mb-2">
            Model:
          </label>
          <input
            type="text"
            id="model"
            name="model"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter car model"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter car price"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter car description"
            rows="4"
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            htmlFor="type_id"
            className="block text-gray-700 font-bold mb-2"
          >
            Type ID:
          </label>
          <input
            type="text"
            id="type_id"
            name="type_id"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter type ID"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
            Image:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}