import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,Button,Stack
} from '@chakra-ui/react'
import { MdBuild , MdCall } from "react-icons/md"
import Link from "next/link";
const TableSolitaire = ({

  options,
  onFilterChange,
}) => {
  return (
    <TableContainer  backgroundColor="#feedd6" >
    <Table variant='simple'>
      <Thead style={{ backgroundColor: '#f0f3f4', color: '#f1f1f1' }}>
      <Tr>
      <Th textAlign="left">Image</Th>
          <Th textAlign="center">Shape</Th>
          <Th textAlign="center">Carat</Th>
          <Th textAlign="center">Color</Th>
          <Th textAlign="center">Clarity</Th>
          <Th textAlign="center">Cut</Th>
          <Th textAlign="center">Price</Th>
          <Th textAlign="center">Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {options.map((solitaire) => (
          <Tr key={solitaire.value} style={{margin: 0, padding: 0}}>
            <Td style={{margin: 0, padding: 0,borderColor: '#ccc'}} onClick={() => onFilterChange(solitaire.value)}>
            {solitaire.Image && (
                            <img
                              src={solitaire.Image}
                              alt={`Solitaire  ${solitaire.SolitaireID}`}
                              className="img-fluid"
                              style={{ maxWidth: "100%", height: "100px", margin: 0, padding: 0 }}
                            />
                          )}
            </Td>
            <Td style={{color: 'black', margin: 0, padding: 0,borderColor: '#ccc', textAlign: 'center'}}>{solitaire.ShapeName}</Td>
            <Td style={{color: 'black', margin: 0, padding: 0,borderColor: '#ccc', textAlign: 'center'}}>{solitaire.Carat}</Td>
            <Td style={{color: 'black', margin: 0, padding: 0,borderColor: '#ccc', textAlign: 'center'}}>{solitaire.ColorName}</Td>
            <Td style={{color: 'black', margin: 0, padding: 0,borderColor: '#ccc', textAlign: 'center'}}>{solitaire.PurityName}</Td>
            <Td style={{color: 'black', margin: 0, padding: 0,borderColor: '#ccc', textAlign: 'center'}}>{solitaire.ColorName}</Td>
            <Td style={{color: 'black', margin: 0, padding: 0,borderColor: '#ccc', textAlign: 'center'}}>{solitaire.PurityName}</Td>
            <Td style={{color: 'black', margin: 0, padding: 0,borderColor: '#ccc', textAlign: 'center'}}>
          

            <Stack direction='row' spacing={2} justifyContent="center" alignItems="center" style={{ display: 'flex' }}>
 
  <Link
                              href={`/${solitaire.Slug}`}
                              className="btn btn-primary read_more"
                            >
                              View Details
                            </Link>
                            <Link
                              href={`/${solitaire.Slug}`}
                              className="btn btn-primary read_more"
                            >
                              Preview
                            </Link>
</Stack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </TableContainer>
  );
};

export default TableSolitaire;
