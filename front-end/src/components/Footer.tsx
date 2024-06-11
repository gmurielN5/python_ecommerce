import { Container, Row, Col } from 'react-bootstrap';

export const Footer: React.FunctionComponent = () => (
  <footer>
    <Container>
      <Row>
        <Col className="text-center py-3">
          Copyright &copy; MeeShop
        </Col>
      </Row>
    </Container>
  </footer>
);
