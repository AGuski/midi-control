import { MidiControlPage } from './app.po';

describe('midi-control App', () => {
  let page: MidiControlPage;

  beforeEach(() => {
    page = new MidiControlPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
