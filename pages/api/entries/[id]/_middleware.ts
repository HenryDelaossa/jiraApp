import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'



export function middleware(req: NextRequest, ev: NextFetchEvent) {

    const checkMongoIDRegExp = new RegExp('^[0-9a-fA-F]{24}$');
    const id: any = req.page.params?.id || '';

    if (!checkMongoIDRegExp.test(id)) {
        return new Response(JSON.stringify({ message: 'no valido el id' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        })

    }
    console.log('middleware', id)
    return NextResponse.next();


}