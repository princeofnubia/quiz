import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import App from "../component/App";

import {
  createHistory,
  createMemorySource,
  LocationProvider,
} from "@reach/router";

const data = require("./question.json");

const server = setupServer(
  rest.get("https://opentdb.com/api.php", (req, res, ctx) => {
    const query = req.url.searchParams;
    const amount = query.get("amount");
    const difficulty = query.get("difficulty");
    const type = query.get("type");
    fetch(data)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return res(ctx.json({ ...data }));
      });
  })
);

server.listen();
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function renderWithReachRouter(
  ui,
  { route = "/", history = createHistory(createMemorySource(route)) } = {}
) {
  return {
    ...render(<LocationProvider history={history}>{ui}</LocationProvider>),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  };
}

function sleep(period) {
  return new Promise((resolve) => setTimeout(resolve, period));
}

describe("App Flow A-Z Navigating from question to the result", () => {
  jest.setTimeout(60000);
  server.use(
    rest.get("https://opentdb.com/api.php", (req, res, ctx) => {
      return res(ctx.json(data));
    })
  );

  test("App renders correctly navigating from a question until result", async () => {
    const {
      container,
      history: { navigate },
    } = renderWithReachRouter(<App />);
    expect(
      screen.getByText(/You will be presented with 10 True or False Questions/i)
    ).toBeInTheDocument();

    const leftClick = { button: 0 };

    userEvent.click(screen.getByText(/Start/i), leftClick);
    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();

    await act(async () => {
      await sleep(1100);
    });

    // Question 1
    await waitFor(() =>
      expect(
        screen.getByText(/Pro Skater 5 only comes with the tutorial/i)
      ).toBeInTheDocument()
    );

    userEvent.click(screen.getByText(/True/i), leftClick);

    await act(async () => {
      await sleep(1100);
    });

    // Question 2;
    await waitFor(() =>
      expect(
        screen.getByText(/This is the correct spelling of/i)
      ).toBeInTheDocument()
    );
    userEvent.click(screen.getByText(/True/i), leftClick);

    await act(async () => {
      await sleep(1100);
    });

    // Question 3
    await waitFor(() =>
      expect(
        screen.getByText(/Unturned originally started as a Roblox game/i)
      ).toBeInTheDocument()
    );
    userEvent.click(screen.getByText(/True/i), leftClick);

    await act(async () => {
      await sleep(1100);
    });

    // Question 4
    await waitFor(() =>
      expect(
        screen.getByText(/real name was Ioseb Bessarionis dze Dzugashvili/i)
      ).toBeInTheDocument()
    );

    userEvent.click(screen.getByText(/True/i), leftClick);

    await act(async () => {
      await sleep(1100);
    });

    // Question 5
    await waitFor(() =>
      expect(screen.getByText(/was released by artist/i)).toBeInTheDocument()
    );

    userEvent.click(screen.getByText(/True/i), leftClick);

    await act(async () => {
      await sleep(1100);
    });

    // Question 6
    await waitFor(() =>
      expect(
        screen.getByText(
          /The board game Go has more possible legal positions than the number of atoms in the visible universe/i
        )
      ).toBeInTheDocument()
    );

    userEvent.click(screen.getByText(/True/i), leftClick);

    await act(async () => {
      await sleep(1100);
    });

    // Question 7
    await waitFor(() =>
      expect(
        screen.getByText(/Peke is considered a female robot/i)
      ).toBeInTheDocument()
    );

    userEvent.click(screen.getByText(/True/i), leftClick);

    await act(async () => {
      await sleep(1100);
    });

    // Question 8
    await waitFor(() =>
      expect(
        screen.getByText(
          /Shintaro Kisaragi is prominently shown with the color/i
        )
      ).toBeInTheDocument()
    );

    userEvent.click(screen.getByText(/True/i), leftClick);

    await act(async () => {
      await sleep(1100);
    });

    // Question 9
    await waitFor(() =>
      expect(
        screen.getByText(/The singer Billie Holiday was also known as/i)
      ).toBeInTheDocument()
    );
    userEvent.click(screen.getByText(/True/i), leftClick);

    await act(async () => {
      await sleep(1100);
    });

    // Question 10
    await waitFor(() =>
      expect(
        screen.getByText(/George and Martha, were derived from George/i)
      ).toBeInTheDocument()
    );

    userEvent.click(screen.getByText(/True/i), leftClick);

    await act(async () => {
      await sleep(1100);
    });
    // Final result and score display
    await waitFor(() =>
      expect(screen.getByText(/Score is 10 \/ 10/i)).toBeInTheDocument()
    );
  });
});
