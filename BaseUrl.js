import { Platform } from "react-native";

let baseUrl = Platform.OS == 'android' ? 'http://10.0.2.2:8000' : 'http://localhost:8000';

export default baseUrl