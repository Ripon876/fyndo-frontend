import React from 'react';
import './SearchBar.css';

function SearchBar() {
	return (
		<div>
			<div class="container py-3">

            <div class="row height d-flex justify-content-center align-items-center">

              <div class="col-md-6">

                <div class="form">
                  <i class="fa fa-search"></i>
                  <input type="text" class="form-control form-input" placeholder="Search anything..." />
                  <span class="left-pan"><i class="fa fa-microphone"></i></span>
                </div>
                
              </div>
              
            </div>
            
          </div>
		</div>
	)
}

export default SearchBar;