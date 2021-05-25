import { shallowMount } from "@vue/test-utils";
import Songs from "@/views/Songs.vue";
import { createStore } from "vuex";

const mock = jest.fn();

const store = createStore({
  modules: {
    page: {
      getters: {
        getTotalPages: mock
      },
      namespaced: true
    }
  },
  actions: {
    fetchSongs: jest.fn(),
    moreSongs: jest.fn()
  },
  getters: {
    getSongs: () => {
      return [{}];
    }
  }
});

beforeEach(() => {
  store.dispatch = jest.fn();
});

describe("Songs.vue", () => {
  it("renders heading", () => {
    const wrapper = shallowMount(Songs, {
      global: {
        plugins: [store]
      }
    });
    expect(wrapper.text()).toMatch("Songs");
  });

  it("button show more exists if value true", () => {
    mock.mockReturnValue(true);
    const wrapper = shallowMount(Songs, {
      global: {
        plugins: [store]
      }
    });
    expect(wrapper.find(".btn-ten-more").exists()).toBe(true);
  });

  it("button show more not exist if value false", () => {
    mock.mockReturnValue(false);
    const wrapper = shallowMount(Songs, {
      global: {
        plugins: [store]
      }
    });
    expect(wrapper.find(".btn-ten-more").exists()).toBe(false);
  });

  it("button show more call function moreSongs", () => {
    mock.mockReturnValue(true);
    const wrapper = shallowMount(Songs, {
      global: {
        plugins: [store]
      }
    });
    wrapper.find(".btn-ten-more").trigger("click");
    expect(store.dispatch).toHaveBeenCalledWith("moreSongs", {
      asc: true,
      order_by: "time_added"
    });
  });

  it("select works", async () => {
    mock.mockReturnValue(true);
    const wrapper = shallowMount(Songs, {
      global: {
        plugins: [store]
      }
    });
    const options = wrapper.find("#sort").findAll("option");
    await options[1].setSelected();
    expect(wrapper.find("option:checked").element.value).toBe(
      "time_added down"
    );
  });

  it("splitSort func works correct", async () => {
    mock.mockReturnValue(true);
    const wrapper = shallowMount(Songs, {
      global: {
        plugins: [store]
      }
    });
    const options = wrapper.find("#sort").findAll("option");
    await options[2].setSelected();
    expect(wrapper.vm.$data.sort).toBe("duration");
    expect(wrapper.vm.$data.asc).toBe(true);
  });

  it("if sort changes dispatch works", async () => {
    mock.mockReturnValue(true);
    const wrapper = shallowMount(Songs, {
      global: {
        plugins: [store]
      }
    });
    const options = wrapper.find("#sort").findAll("option");
    await options[2].setSelected();
    expect(store.dispatch).toHaveBeenCalledWith("fetchSongs", {
      asc: true,
      order_by: "duration"
    });
  });
});
