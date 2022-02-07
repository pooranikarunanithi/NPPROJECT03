import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  CurrentRefinements,
  RefinementList,
  HierarchicalMenu,
  Stats,
  Configure,
  Panel,
  ToggleRefinement,
} from 'react-instantsearch-dom';
import { DatePicker, Select } from "antd";
import moment from "moment";



const { Option } = Select;



/*const config ={
  appId: process.env.REACT_APP_ALGOLIA_APP_ID,
  apiKey: process.env.REACT_APP_ALGOLIA_APP_KEY,
  language :"en",
    countries:["be"],
}*/

const searchClient = algoliasearch(
  'O6DSLVEK9M',
  '52b5b14e748db9becaec03f7815bc65e'
);

/*
<InstantSearch indexName="ud" searchClient={searchClient}>
 <Panel header="Brands">
              <RefinementList
                attribute="brand"
                searchable={true}
                translations={{
                  placeholder: 'Search for brands…',
                }}
              />
            </Panel>

 </InstantSearch>
*/

const HotelCreateForm = ({
    values,
    setValues,
    handleChange,
    handleImageChange,
    handleSubmit
    
  }) => {
    const { title, content, price, location } = values;
 
return (
 
    <form onSubmit={handleSubmit }>
    <div className="form-group">
    <label className="=btn btn-outline-secondary btn- block  m-2 text-left">
     image 
      
      <input 
      type="file"  
      name="image" 
      onChange={handleImageChange} 
      accept ="image/*" 
       hidden 
       />
    
    </label>
      
      < input 
      type="text" 
      name="title" 
      onChange={handleChange} 
      placeholder="Title" 
      className="form-control m-2" 
      value ={title} 
      
      />
    
    
    < textarea
      
      name="content" 
      onChange={handleChange} 
      placeholder="Content" 
      className="form-control m-2" 
      value ={content} 
      
      />
     
     < textarea
      
      name="location" 
      onChange={handleChange} 
      placeholder="Location" 
      className="form-control m-2" 
      value ={location} 
      
      />
      
      < input 
      type="number" 
      name="price" 
      onChange={handleChange} 
      placeholder="Price" 
      className="form-control m-2" 
      value ={price} 
      
      />
    
             <Select
              onChange={(value) => setValues({ ...values, bed: value })}
              className="w-100 m-2"
              size="large"
              placeholder="Number of beds"
            >
              <Option key={1}>{1}</Option>
              <Option key={2}>{2}</Option>
              <Option key={3}>{3}</Option>
              <Option key={4}>{4}</Option>
            </Select>
    
    <DatePicker
            placeholder="From date"
            className="form-control m-2"
            onChange={(date, dateString) =>
              setValues({ ...values, from: dateString })
            }
            disabledDate={(current) =>
              current && current.valueOf() < moment().subtract(1, "days")
            }
          />
    
    <DatePicker
            placeholder="To date"
            className="form-control m-2"
            onChange={(date, dateString) =>
              setValues({ ...values, to: dateString })
            }
            disabledDate={(current) =>
              current && current.valueOf() < moment().subtract(1, "days")
            }
          />
    
    </div>
    
     <button className="btn btn-outline-primary m-2">Save</button>
    </form>
);
};

export default HotelCreateForm;
