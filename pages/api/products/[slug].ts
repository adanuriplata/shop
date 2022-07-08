import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { IProduct } from '../../../interfaces'
import { Product } from '../../../models'

type Data = 
| { message: string }
| IProduct

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

  switch ( req.method ) {
    case 'GET':
      return   getProduct(req, res)
      
      default :
      return res.status(401).json({ message: 'Bad request' })
    }
}

const getProduct = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

  db.connect
  const {slug} = req.query
  const product = await Product.findOne({ slug }).lean();
  db.disconnect

  if ( !product ) {
    return res.status(404).json({
      message: 'Producto no encontrado'
    })
  }

  return res.status(200).json( product )


  throw new Error('Function not implemented.')
}
