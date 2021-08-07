import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

declare var $: any;

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-home-client',
  styleUrls: ['./home-client.component.scss'],
  templateUrl: './home-client.component.html',
})
export class HomeClientComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
  }

  arr = [
    {id: 1, link: 'assets/images/banner/z2668762086835_7964a166bf3643f5084113343884e551.jpg'},
    {id: 2, link: 'assets/images/banner/z2668760300053_454f272ed55d808b819e8ebc414f6195.jpg'},
    {id: 3, link: 'assets/images/banner/z2668756659373_3d72f7dcac64cd67242f1cd1e637e399.jpg'},
    {id: 4, link: 'assets/images/banner/z2668766433758_b516aedc0f21a2ac1288b8912d26e70a.jpg'},
  ];

  ngOnInit(): void {

    const $topeContainer = $('.isotope-grid');
    const $filter = $('.filter-tope-group');
    // filter items on button click
    $filter.each(function () {
      $filter.on('click', 'button', function () {
        const filterValue = $(this).attr('data-filter');
        $topeContainer.isotope({filter: filterValue});
      });

    });

    // init Isotope
    $(window).on('load', function () {
      const $grid = $topeContainer.each(function () {
        $(this).isotope({
          itemSelector: '.isotope-item',
          layoutMode: 'fitRows',
          percentPosition: true,
          animationEngine: 'best-available',
          masonry: {
            columnWidth: '.isotope-item'
          }
        });
      });
    });

    const isotopeButton = $('.filter-tope-group button');

    $(isotopeButton).each(function () {
      $(this).on('click', function () {
        for (let i = 0; i < isotopeButton.length; i++) {
          $(isotopeButton[i]).removeClass('how-active1');
        }

        $(this).addClass('how-active1');
      });
    });

  }
}
