import dotenv from 'dotenv';


// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch';
jest.setTimeout(30000);
dotenv.config({path: '.env.test'});
jest.mock("./src/helper/globalEnvironment.js", () => ({
     globalEnvironment: () => ({...process.env})
}));