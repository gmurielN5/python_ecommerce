import { Container, Row, Col } from 'react-bootstrap';

export const Footer: React.FC = () => (
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
