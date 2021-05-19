import { shallowMount } from "@vue/test-utils";
import BaseSongItem from "@/components/BaseSongItem.vue";

const mocked_data = {
  cover: "cover",
  track_id: 1,
  track_name: "test",
  artists: [
    {
      artist_id: 1,
      artist_name: "artist_test"
    }
  ]
};

describe("BaseSongItem.vue", () => {
  it("renders item", () => {
    const wrapper = shallowMount(BaseSongItem, {
      props: {
        song: mocked_data
      }
    });
    expect(wrapper.text()).toMatch("test");
  });
});
