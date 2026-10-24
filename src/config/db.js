import postgres from "postgres";

const sql = postgres('postgres://devlab:secretpassword@localhost:5432/devlabdb');
export default sql;