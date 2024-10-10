import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import { MdBuild, MdCall, MdOpenInNew } from "react-icons/md";
const TableSolitaire = ({ options, onFilterChange }) => {
  return (
    <TableContainer backgroundColor="#feedd6">
      <Table variant="simple">
        <Thead>
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
            <Tr key={solitaire.value} style={{ margin: 0, padding: 0 }}>
              <Td
                style={{ margin: 0, padding: 0, borderColor: "#ccc" }}
                onClick={() => onFilterChange(solitaire.value)}
              >
                {solitaire.Image && (
                  <img
                    src={solitaire.Image}
                    alt={`Solitaire  ${solitaire.SolitaireID}`}
                    className="img-fluid"
                    style={{
                      maxWidth: "100%",
                      height: "100px",
                      margin: 0,
                      padding: 0,
                    }}
                  />
                )}
              </Td>
              <Td
                style={{
                  color: "black",
                  margin: 0,
                  padding: 0,
                  borderColor: "#ccc",
                  textAlign: "center",
                }}
              >
                {solitaire.ShapeName}
              </Td>
              <Td
                style={{
                  color: "black",
                  margin: 0,
                  padding: 0,
                  borderColor: "#ccc",
                  textAlign: "center",
                }}
              >
                {solitaire.Carat}
              </Td>
              <Td
                style={{
                  color: "black",
                  margin: 0,
                  padding: 0,
                  borderColor: "#ccc",
                  textAlign: "center",
                }}
              >
                {solitaire.ColorName}
              </Td>
              <Td
                style={{
                  color: "black",
                  margin: 0,
                  padding: 0,
                  borderColor: "#ccc",
                  textAlign: "center",
                }}
              >
                {solitaire.PurityName}
              </Td>
              <Td
                style={{
                  color: "black",
                  margin: 0,
                  padding: 0,
                  borderColor: "#ccc",
                  textAlign: "center",
                }}
              >
                {solitaire.ColorName}
              </Td>
              <Td
                style={{
                  color: "black",
                  margin: 0,
                  padding: 0,
                  borderColor: "#ccc",
                  textAlign: "center",
                }}
              >
                {solitaire.PurityName}
              </Td>
              <Td
                style={{
                  color: "black",
                  margin: 0,
                  padding: 0,
                  borderColor: "#ccc",
                  textAlign: "center",
                }}
              >
                <Stack direction="row" spacing={4}>
                  <Link href={`/${solitaire.Slug}`}>
                    <Button
                      leftIcon={<MdOpenInNew />}
                      colorScheme="pink"
                      variant="solid"
                    >
                      View Details
                    </Button>
                  </Link>
                  <Button
                    rightIcon={<MdCall />}
                    colorScheme="blue"
                    variant="outline"
                  >
                    Call us
                  </Button>
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
