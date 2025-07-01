import postgres from 'postgres';
import { NextResponse } from 'next/server'; // [IMPORTANTE] Importe o NextResponse

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listInvoices(): Promise<any> {
const data = await sql`
SELECT invoices.amount, customers.name
FROM invoices
JOIN customers ON invoices.customer_id = customers.id
WHERE invoices.amount = 666;
`;

	return data;
}

export async function GET() {
  try {
    const invoices = await listInvoices();
    // Usa NextResponse.json para retornar a resposta JSON com status 200 (OK)
    return NextResponse.json(invoices);
  } catch (error) {
    // Em caso de erro, retorna um JSON com o erro e status 500 (Internal Server Error)
    console.error('Erro na query:', error); // É uma boa prática logar o erro no servidor
    return NextResponse.json({ message: 'Erro ao buscar os dados.' }, { status: 500 });
  }
}