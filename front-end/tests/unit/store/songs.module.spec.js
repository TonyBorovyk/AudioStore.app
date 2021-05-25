import store from "@/store";
import mockData from "../mockData";

describe("Mutations", () => {
  beforeEach(() => {
    store.state.songs.songs = [{ artists: [] }];
  });

  it("Songs set correct", () => {
    store.commit("setSongs", mockData.GET_SONGS);
    expect(store.state.songs.songs).toStrictEqual(mockData.GET_SONGS);
  });

  it("Songs added correct", () => {
    store.commit("setSongs", mockData.GET_SONGS);
    store.commit("addSongs", mockData.GET_NEW_SONG);
    expect(store.state.songs.songs).toStrictEqual(
      mockData.GET_SONGS.concat(mockData.GET_NEW_SONG)
    );
  });
});
