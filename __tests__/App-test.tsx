import App from "../src/App";
import renderer from 'react-test-renderer';
beforeEach(() => {
    jest.useFakeTimers();
  });

test('renders correctly', async () => {
    const tree = renderer.create(<App />).toJSON();
    await expect(tree).toMatchSnapshot();
});